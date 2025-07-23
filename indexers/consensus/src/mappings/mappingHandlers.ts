global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
global.Buffer = require('buffer/').Buffer;

import { stringify } from '@autonomys/auto-utils';
import { SubstrateBlock } from '@subql/types';
import { Entity } from '@subql/types-core';
import { ZERO_BIGINT } from './constants';
import { createAccount, createBlock, createEvent, createLog, initializeCache } from './db';
import { EVENT_HANDLERS } from './eventHandler';
import { processExtrinsic } from './extrinsicHandler';
import { getBlockAuthor } from './helper';
import { LogValue } from './types';

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

  logger.info(
    `[Block: ${blockNumber}] Extrinsics: ${extrinsicsCount}, Events: ${eventsCount}, SpecVersion: ${specVersion}`,
  );

  const cache = initializeCache();
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
    [{}, []],
  );

  const blockReward = finalizationEvents.find(
    (event) => event.event.section === 'rewards' && event.event.method === 'BlockReward',
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
    const { extrinsic: newExtrinsic, events } = processExtrinsic(
      extrinsic,
      extrinsicIdx,
      eventsByExtrinsic[extrinsicIdx] || [],
      {
        height,
        blockHash,
        blockTimestamp,
        blockNumber,
        cache,
        startEventIndex: eventIndex,
      },
    );

    newExtrinsics.push(newExtrinsic);
    newEvents.push(...events);

    eventIndex += events.length;
  });
  const processExtrinsicsDuration = Date.now() - processExtrinsicsStartTime;

  // Process finalization events
  const finalizationEventsStartTime = Date.now();
  finalizationEvents.forEach(async (event) => {
    newEvents.push(
      createEvent(
        height,
        blockHash,
        BigInt(eventIndex),
        '',
        '',
        event.event.section,
        event.event.method,
        blockTimestamp,
        event.phase.type,
        0,
        stringify(event.event.data),
        '',
      ),
    );

    // Process specific events
    const eventKey = event.event.section + '.' + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler)
      handler({
        event,
        cache,
        height,
        blockHash,
        blockTimestamp,
        extrinsicId: height + '-' + event.phase.type,
        eventId: height + '-' + eventIndex,
        fee: ZERO_BIGINT,
        successEvent: true,
        extrinsicSigner: '',
        extrinsicMethodToPrimitive: {},
      });

    // Increment event index
    eventIndex++;
  });
  const finalizationEventsDuration = Date.now() - finalizationEventsStartTime;
  logger.info(
    `[Block: ${blockNumber}] Finalization events processed in ${finalizationEventsDuration}ms`,
  );

  // Create block logs
  const createLogsStartTime = Date.now();
  const newLogs = digest.logs.map((log, i) => {
    const logData = log.toHuman();
    const logJson = log.toPrimitive();
    const kind = logData ? Object.keys(logData)[0] : '';
    const rawKind = logJson ? Object.keys(logJson)[0] : '';
    const _value = logJson ? logJson[rawKind as keyof typeof logJson] : '';
    const value: LogValue =
      Array.isArray(_value) && _value.length === 2
        ? { data: _value[1], engine: _value[0] }
        : { data: _value };

    return createLog(height, blockHash, i, kind, stringify(value), blockTimestamp);
  });
  const createLogsDuration = Date.now() - createLogsStartTime;
  logger.info(`[Block: ${blockNumber}] ${newLogs.length} logs created in ${createLogsDuration}ms`);

  // Prepare for bulkSave
  const preBulkSaveStartTime = Date.now();
  logger.info(
    `[Block: ${blockNumber}] Starting bulk entity save. Extrinsics: ${newExtrinsics.length}, Events: ${newEvents.length}, Logs: ${newLogs.length}, Transfers: ${cache.transfers.length}, Rewards: ${cache.rewards.length}`,
  );
  const preBulkSaveDuration = Date.now() - preBulkSaveStartTime;

  // Save entities in parallel
  const bulkSaveStartTime = Date.now();

  // Fetch account balances for all affected accounts
  const accountUpdateStartTime = Date.now();
  const accountsToUpdate = Array.from(cache.accountsToUpdate);
  const newAccounts: Entity[] = [];

  if (accountsToUpdate.length > 0) {
    logger.info(
      `[Block: ${blockNumber}] Fetching balances for ${accountsToUpdate.length} accounts`,
    );

    // Batch fetch account info from chain state
    const accountInfoPromises = accountsToUpdate.map((accountId) =>
      api.query.system.account(accountId),
    );

    const accountInfos = await Promise.all(accountInfoPromises);

    accountInfos.forEach((accountInfo, index) => {
      const accountId = accountsToUpdate[index];
      const account = accountInfo.toPrimitive() as any;

      newAccounts.push(
        createAccount(
          accountId,
          BigInt(account.nonce || 0),
          BigInt(account.data.free || 0),
          BigInt(account.data.reserved || 0),
          height,
          height,
        ),
      );
    });
  }
  const accountUpdateDuration = Date.now() - accountUpdateStartTime;
  logger.info(
    `[Block: ${blockNumber}] Account balance fetch completed in ${accountUpdateDuration}ms`,
  );

  await Promise.all([
    // Save extrinsic, events and logs
    store.bulkCreate(`Extrinsic`, newExtrinsics),
    store.bulkCreate(`Event`, newEvents),
    store.bulkCreate(`Log`, newLogs),

    // Save transfers and rewards
    store.bulkCreate(`Transfer`, cache.transfers),
    store.bulkCreate(`Reward`, cache.rewards),

    // Save/update accounts with current balances
    ...(newAccounts.length > 0 ? [store.bulkUpdate(`Account`, newAccounts)] : []),

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
        authorId,
      ),
    ]),
  ]);
  const bulkSaveDuration = Date.now() - bulkSaveStartTime;
  logger.info(`[Block: ${blockNumber}] All entities saved (bulkCreate) in ${bulkSaveDuration}ms`);

  // Calculate time breakdown for detailed analysis
  const totalMeasuredTime =
    initDuration +
    eventsOrgDuration +
    processExtrinsicsDuration +
    finalizationEventsDuration +
    createLogsDuration +
    preBulkSaveDuration +
    bulkSaveDuration;

  const totalActualTime = Date.now() - handlerStartTime;
  const unmeasuredTime = totalActualTime - totalMeasuredTime;

  logger.info(
    `[Block: ${blockNumber}] handleBlock END. Total duration: ${totalActualTime}ms. Breakdown: init=${initDuration}, eventsOrg=${eventsOrgDuration}, extrinsics=${processExtrinsicsDuration}, finalization=${finalizationEventsDuration}, logs=${createLogsDuration}, preBulkPrep=${preBulkSaveDuration}, bulkSave=${bulkSaveDuration}, unmeasured=${unmeasuredTime}`,
  );
}
