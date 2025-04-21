global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
global.Buffer = require("buffer/").Buffer;

import {
  account,
  blockchainSize,
  spacePledge,
} from "@autonomys/auto-consensus";
import type { ApiAtBlockHash } from "@autonomys/auto-utils";
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
import { ExtrinsicPrimitive, LogValue } from "./types";
import { groupEventsFromBatchAll } from "./utils";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
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

  let cache = initializeCache();
  const newExtrinsics = new Array<Entity>(extrinsics.length);
  const newEvents = new Array<Entity>(events.length);
  let eventIndex = 0;

  // Calculate space pledged and blockchain size concurrently
  const [_spacePledged, _blockchainSize] = await Promise.all([
    spacePledge(api as unknown as ApiAtBlockHash),
    blockchainSize(api as unknown as ApiAtBlockHash),
  ]);

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

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
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
    cache.addressToUpdate.add(extrinsicSigner);

    if (
      extrinsic.method.section === "utility" &&
      extrinsic.method.method === "batchAll"
    ) {
      const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
      batchedExtrinsicEvents.forEach((events, index) => {
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
  });

  // Process finalization events
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

  // Create block logs
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

  // Update accounts
  const uniqueAddresses = Array.from(cache.addressToUpdate);
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api as any, address))
  );

  // Create and save accounts
  const accountHistories = accounts.map((account, i) =>
    createAccountHistory(
      uniqueAddresses[i],
      height,
      BigInt(account.nonce.toString()),
      account.data.free,
      account.data.reserved,
      account.data.free + account.data.reserved
    )
  );

  // Save many entities in parallel
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
        _spacePledged,
        _blockchainSize,
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
}
