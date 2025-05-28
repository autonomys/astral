global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
global.Buffer = require("buffer/").Buffer;

import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { Entity } from "@subql/types-core";
import { EMPTY_SIGNATURE, ZERO_BIGINT } from "./constants";
import {
  createAccountHistory,
  createBlock,
  createEvent,
  createExtrinsic,
  createLog,
  initializeCache,
} from "./db";
import { EVENT_HANDLERS } from "./eventHandler";
import { getBlockAuthor, parseDataToCid } from "./helper";
import { publishAccountsToRedis } from "./redisPusher";
import { ExtrinsicPrimitive, LogValue } from "./types";
import { groupEventsFromBatchAll } from "./utils";

export const accountsToProcess: Map<number, { blockHash: string; addresses: Set<string> }> = new Map();
const DEPTH_TO_PUBLISH_TO_REDIS = 4;


/*
This is a very long and messy function. We must refactor it.
*/

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const handlerStartTime = Date.now();
  const blockNumber = _block.block.header.number.toNumber();
  logger.info(`[Block: ${blockNumber}] handleBlock START`);

  // Measure initialization time
  const initStartTime = Date.now();
  const {
    block: {
      header: { number, parentHash, stateRoot, extrinsicsRoot, digest },
      hash,
      extrinsics,
    },
    timestamp,
    specVersion,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const blockHash = hash.toString();
  const blockTimestamp = timestamp ? timestamp : new Date(0);
  let authorId = getBlockAuthor(_block);
  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  logger.info(`[Block: ${blockNumber}] Extrinsics: ${extrinsicsCount}, Events: ${eventsCount}, SpecVersion: ${specVersion}`);

  let cache = initializeCache();
  const newExtrinsics: Entity[] = [];
  const newEvents: Entity[] = [];
  let eventIndex = 0;
  const initDuration = Date.now() - initStartTime;
  logger.info(`[Block: ${blockNumber}] Initialization completed in ${initDuration}ms`);

  // Measure events organization time
  const eventsOrgStartTime = Date.now();
  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if (event.phase.isApplyExtrinsic) {
        const idx = event.phase.asApplyExtrinsic.toNumber();
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if (event.phase.isFinalization) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  const blockReward = finalizationEvents.find(
    (event) =>
      event.event.section === "rewards" && event.event.method === "BlockReward"
  );
  if (blockReward) {
    authorId = blockReward.event.data[0].toString();
  }
  const eventsOrgDuration = Date.now() - eventsOrgStartTime;
  logger.info(`[Block: ${blockNumber}] Events organization completed in ${eventsOrgDuration}ms`);
  logger.info(`[Block: ${blockNumber}] Author ID: ${authorId}`);

  // Process extrinsics
  const processExtrinsicsStartTime = Date.now();
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicProcessStartTime = Date.now();
    const extrinsicHash = extrinsic.hash.toString();
    const extrinsicMethodToPrimitive =
      extrinsic.method.toPrimitive() as ExtrinsicPrimitive;
    const extrinsicEvents = eventsByExtrinsic[extrinsicIdx] || [];

    const { feeEvent, errorEvent, successEvent } = extrinsicEvents.reduce(
      (
        acc: {
          feeEvent?: (typeof events)[number];
          errorEvent?: (typeof events)[number];
          successEvent?: (typeof events)[number];
        },
        event
      ) => {
        // Check for fee event
        if (
          !acc.feeEvent &&
          event.event.section === "balances" &&
          event.event.method === "Withdraw"
        ) {
          acc.feeEvent = event;
        }
        // Check for error event
        else if (
          !acc.errorEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicFailed"
        ) {
          acc.errorEvent = event;
        }
        // Check for success event
        else if (
          !acc.successEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicSuccess"
        ) {
          acc.successEvent = event;
        }
        return acc;
      },
      {}
    );

    // Calculate fee
    const fee = feeEvent?.event?.data[1]
      ? BigInt(feeEvent.event.data[1].toString())
      : ZERO_BIGINT;
    const error = errorEvent ? stringify(errorEvent.event.data) : "";

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.isSigned
      ? extrinsic.signer.toString()
      : "";
    const extrinsicSignature = extrinsic.isSigned
      ? extrinsic.signature.toString()
      : EMPTY_SIGNATURE;
    const extrinsicId = height + "-" + extrinsicIdx.toString();

    // Detect data storage extrinsics and parse args to cid
    let cid: string | undefined = "";
    let extrinsicArgs: string = stringify(extrinsicMethodToPrimitive.args);
    if (
      (extrinsic.method.section === "historySeeding" &&
        extrinsic.method.method === "seedHistory") ||
      (extrinsic.method.section === "system" &&
        (extrinsic.method.method === "remarkWithEvent" ||
          extrinsic.method.method === "remark"))
    ) {
      const parsedArgs = parseDataToCid(extrinsicMethodToPrimitive.args.remark);
      cid = parsedArgs.cid;
      // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
      extrinsicArgs = parsedArgs.modifiedArgs ?? extrinsicArgs;
    }

    newExtrinsics.push(
      createExtrinsic(
        extrinsicHash,
        height,
        blockHash,
        extrinsicIdx,
        extrinsic.method.section,
        extrinsic.method.method,
        successEvent ? true : false,
        blockTimestamp,
        BigInt(extrinsic.nonce.toString()),
        extrinsicSigner,
        extrinsicSignature,
        extrinsicEvents.length,
        extrinsicArgs,
        error,
        BigInt(extrinsic.tip.toString()),
        fee,
        pos,
        cid
      )
    );
    if (extrinsicSigner) {
      cache.addressToUpdate.add(extrinsicSigner);
    }

    if (
      extrinsic.method.section === "utility" &&
      extrinsic.method.method === "batchAll"
    ) {
      const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
      logger.debug(`[Block: ${blockNumber}] Extrinsic ${extrinsicIdx} is batchAll with ${batchedExtrinsicEvents.length} inner calls.`);
      batchedExtrinsicEvents.forEach((events, index) => {
        const innerCallStartTime = Date.now();
        const extrinsicArgs = (extrinsic.args[0].toPrimitive() as any)[index];
        events.forEach((event) => {
          // Process extrinsic events
          // Detect data storage extrinsics and parse args to cid
          let cid: string | undefined = "";
          let eventsArgs: string = stringify(event.event.data);
          if (
            event.event.section === "system" &&
            event.event.method === "Remarked"
          ) {
            const parsedArgs = parseDataToCid(event.event.data[1].toString());
            cid = parsedArgs.cid;
            // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
            eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
          }

          newEvents.push(
            createEvent(
              height,
              blockHash,
              BigInt(eventIndex),
              extrinsicId,
              extrinsicHash,
              event.event.section,
              event.event.method,
              blockTimestamp,
              event.phase.type,
              pos,
              eventsArgs,
              cid
            )
          );

          // Process specific events
          const eventKey = event.event.section + "." + event.event.method;
          const handler = EVENT_HANDLERS[eventKey];
          if (handler)
            handler({
              event,
              cache,
              height,
              blockHash,
              blockTimestamp,
              extrinsicId,
              eventId: height + "-" + eventIndex,
              fee,
              successEvent: successEvent ? true : false,
              extrinsicSigner,
              extrinsicMethodToPrimitive: extrinsicArgs,
            });

          // Increment event index
          eventIndex++;
        });
        logger.debug(`[Block: ${blockNumber}] Extrinsic ${extrinsicIdx} - batchAll inner call ${index} processed in ${Date.now() - innerCallStartTime}ms`);
      });
    } else {
      // Process extrinsic events
      extrinsicEvents.forEach((event) => {
        // Detect data storage extrinsics and parse args to cid
        let cid: string | undefined = "";
        let eventsArgs: string = stringify(event.event.data);
        if (
          event.event.section === "system" &&
          event.event.method === "Remarked"
        ) {
          const parsedArgs = parseDataToCid(event.event.data[1].toString());
          cid = parsedArgs.cid;
          // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
          eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
        }

        newEvents.push(
          createEvent(
            height,
            blockHash,
            BigInt(eventIndex),
            extrinsicId,
            extrinsicHash,
            event.event.section,
            event.event.method,
            blockTimestamp,
            event.phase.type,
            pos,
            eventsArgs,
            cid
          )
        );

        // Process specific events
        const eventKey = event.event.section + "." + event.event.method;
        const handler = EVENT_HANDLERS[eventKey];
        if (handler)
          handler({
            event,
            cache,
            height,
            blockHash,
            blockTimestamp,
            extrinsicId,
            eventId: height + "-" + eventIndex,
            fee,
            successEvent: successEvent ? true : false,
            extrinsicSigner,
            extrinsicMethodToPrimitive,
          });

        // Increment event index
        eventIndex++;
      });
    }
    logger.debug(`[Block: ${blockNumber}] Extrinsic ${extrinsicIdx} (${extrinsic.method.section}.${extrinsic.method.method}) processed in ${Date.now() - extrinsicProcessStartTime}ms`);
  });
  const processExtrinsicsDuration = Date.now() - processExtrinsicsStartTime;
  logger.info(`[Block: ${blockNumber}] All extrinsics processed in ${processExtrinsicsDuration}ms`);

  // Process finalization events
  const finalizationEventsStartTime = Date.now();
  finalizationEvents.forEach(async (event) => {
    newEvents.push(
      createEvent(
        height,
        blockHash,
        BigInt(eventIndex),
        "",
        "",
        event.event.section,
        event.event.method,
        blockTimestamp,
        event.phase.type,
        0,
        stringify(event.event.data),
        ""
      )
    );

    // Process specific events
    const eventKey = event.event.section + "." + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler)
      handler({
        event,
        cache,
        height,
        blockHash,
        blockTimestamp,
        extrinsicId: height + "-" + event.phase.type,
        eventId: height + "-" + eventIndex,
        fee: ZERO_BIGINT,
        successEvent: true,
        extrinsicSigner: "",
        extrinsicMethodToPrimitive: {},
      });

    // Increment event index
    eventIndex++;
  });
  const finalizationEventsDuration = Date.now() - finalizationEventsStartTime;
  logger.info(`[Block: ${blockNumber}] Finalization events processed in ${finalizationEventsDuration}ms`);

  // Create block logs
  const createLogsStartTime = Date.now();
  const newLogs = digest.logs.map((log, i) => {
    const logData = log.toHuman();
    const logJson = log.toPrimitive();
    const kind = logData ? Object.keys(logData)[0] : "";
    const rawKind = logJson ? Object.keys(logJson)[0] : "";
    const _value = logJson ? logJson[rawKind as keyof typeof logJson] : "";
    const value: LogValue =
      Array.isArray(_value) && _value.length === 2
        ? { data: _value[1], engine: _value[0] }
        : { data: _value };

    return createLog(
      height,
      blockHash,
      i,
      kind,
      stringify(value),
      blockTimestamp
    );
  });
  const createLogsDuration = Date.now() - createLogsStartTime;
  logger.info(`[Block: ${blockNumber}] ${newLogs.length} logs created in ${createLogsDuration}ms`);

  // Update accounts
  const fetchAccountsStartTime = Date.now();
  const uniqueAddresses = Array.from(cache.addressToUpdate);
  logger.info(`[Block: ${blockNumber}] Updating ${uniqueAddresses.length} unique addresses.`);
  // const accounts = await Promise.all(
  //   uniqueAddresses.map((address) => account(api as any, address))
  // );
  const fetchAccountsDuration = Date.now() - fetchAccountsStartTime;
  logger.info(`[Block: ${blockNumber}] Fetched ${uniqueAddresses.length} account details in ${fetchAccountsDuration}ms (after Promise.all)`);

  uniqueAddresses.forEach(address => {
    if (!accountsToProcess.has(blockNumber)) {
      accountsToProcess.set(blockNumber, { blockHash, addresses: new Set() });
    }
    accountsToProcess.get(blockNumber)!.addresses.add(address);
  });

  // Create and save accounts
  const createAccountHistoriesStartTime = Date.now();
  const accountHistories: Entity[] = [];
  if (uniqueAddresses.length > 0) {
    logger.info(`[Block: ${blockNumber}] Creating ${uniqueAddresses.length} placeholder AccountHistory records.`);
    for (const address of uniqueAddresses) {
      try {
        const placeholderHistory = createAccountHistory(
          address,
          height,
          ZERO_BIGINT,
          ZERO_BIGINT,
          ZERO_BIGINT,
          ZERO_BIGINT
        );
        accountHistories.push(placeholderHistory as Entity);
      } catch (error) {
        logger.error(`[Block: ${blockNumber}] Error creating AccountHistory for address ${address}:`, error);
      }
    }
  }
  const createAccountHistoriesDuration = Date.now() - createAccountHistoriesStartTime;
  if (uniqueAddresses.length > 0) {
    logger.info(`[Block: ${blockNumber}] ${accountHistories.length} placeholder AccountHistory entities prepared in ${createAccountHistoriesDuration}ms`);
  }

  // Prepare for bulkSave - measure time for any preparation
  const preBulkSaveStartTime = Date.now();
  logger.info(`[Block: ${blockNumber}] Starting bulk entity save. Extrinsics: ${newExtrinsics.length}, Events: ${newEvents.length}, Logs: ${newLogs.length}, Transfers: ${cache.transfers.length}, Rewards: ${cache.rewards.length}`);
  const preBulkSaveDuration = Date.now() - preBulkSaveStartTime;
  if (preBulkSaveDuration > 1) { // Only log if it's more than a millisecond, to reduce noise
    logger.info(`[Block: ${blockNumber}] Bulk save preparation took ${preBulkSaveDuration}ms`);
  }
  
  // Save many entities in parallel
  const bulkSaveStartTime = Date.now();
  await Promise.all([
    // Save extrinsic, events and logs
    store.bulkCreate(`Extrinsic`, newExtrinsics),
    store.bulkCreate(`Event`, newEvents),
    store.bulkCreate(`Log`, newLogs),

    // Save transfers and rewards
    store.bulkCreate(`Transfer`, cache.transfers),
    store.bulkCreate(`Reward`, cache.rewards),

    // Save account
    store.bulkCreate(`AccountHistory`, accountHistories),

    // Create and save block
    store.bulkCreate(`Block`, [
      createBlock(
        blockHash,
        height,
        blockTimestamp,
        parentHash.toString(),
        specVersion.toString(),
        stateRoot.toString(),
        extrinsicsRoot.toString(),
        extrinsicsCount,
        eventsCount,
        newLogs.length,
        cache.transfers.length,
        cache.rewards.length,
        cache.totalBlockRewardsCount,
        cache.totalVoteRewardsCount,
        cache.totalTransferValue,
        cache.totalRewardValue,
        cache.totalBlockRewardValue,
        cache.totalVoteRewardValue,
        authorId
      ),
    ]),
  ]);
  const bulkSaveDuration = Date.now() - bulkSaveStartTime;
  logger.info(`[Block: ${blockNumber}] All entities saved (bulkCreate) in ${bulkSaveDuration}ms`);

  // Publish to Redis AFTER all database operations are complete AND block is deep enough
  // This is a temporary solution to avoid deadlocks with the account-worker
  if (uniqueAddresses.length > 0) {
    // Store addresses for this block, but don't publish to Redis yet
    logger.info(`[REDIS: ${blockNumber}] Storing ${uniqueAddresses.length} addresses for block ${blockNumber}, will publish when block is 10+ deep`);
  }

  // Check if we have blocks that are now DEPTH_TO_PUBLISH_TO_REDIS+ deep and can be published to Redis
  // This practice IS NOT to handle re-orgs, it is for avoiding deadlocks with the account-worker
  const currentBlockNumber = blockNumber;
  const blocksToPublish: number[] = [];
  
  for (const [storedBlockNumber] of accountsToProcess.entries()) {
    const blockDepth = currentBlockNumber - storedBlockNumber;
    if (blockDepth >= DEPTH_TO_PUBLISH_TO_REDIS) {
      blocksToPublish.push(storedBlockNumber);
    }
  }

  if (blocksToPublish.length > 0) {
    logger.info(`[REDIS: ${blockNumber}] Publishing ${blocksToPublish.length} deep blocks to Redis: ${blocksToPublish.join(', ')}`);
    publishAccountsToRedis(blocksToPublish).catch(err => 
      logger.warn(`Background Redis publishing failed: ${err.message}`)
    );
  }

  // Calculate time breakdown for detailed analysis
  const totalMeasuredTime = initDuration + 
    eventsOrgDuration + 
    processExtrinsicsDuration +
    finalizationEventsDuration + 
    createLogsDuration + 
    fetchAccountsDuration + 
    // createAccountHistoriesDuration + 
    preBulkSaveDuration +
    bulkSaveDuration;
    
  const totalActualTime = Date.now() - handlerStartTime;
  const unmeasuredTime = totalActualTime - totalMeasuredTime;
  
  logger.info(`[Block: ${blockNumber}] handleBlock END. Total duration: ${totalActualTime}ms. Breakdown: init=${initDuration}, eventsOrg=${eventsOrgDuration}, extrinsics=${processExtrinsicsDuration}, finalization=${finalizationEventsDuration}, logs=${createLogsDuration}, fetchAcc=${fetchAccountsDuration}, preBulkPrep=${preBulkSaveDuration}, bulkSave=${bulkSaveDuration}, unmeasured=${unmeasuredTime}`);
}
