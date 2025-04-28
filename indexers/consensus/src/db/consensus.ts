import {
  Cache,
  CachedAccountHistory,
  CachedBlock,
  CachedEvent,
  CachedExtrinsic,
  CachedLog,
  CachedReward,
  CachedTransfer,
} from "../types/cache.ts";
import { sql } from "./client.ts";
import { insert } from "./helper.ts";

export const insertBlocks = async (
  blocks: CachedBlock[],
  sqlClient?: typeof sql
) => {
  if (blocks.length === 0) return;

  const columns = [
    "id",
    "sort_id",
    "height",
    "hash",
    "timestamp",
    "parent_hash",
    "spec_id",
    "state_root",
    "extrinsics_root",
    "space_pledged",
    "blockchain_size",
    "extrinsics_count",
    "events_count",
    "logs_count",
    "transfers_count",
    "rewards_count",
    "block_rewards_count",
    "vote_rewards_count",
    "transfer_value",
    "reward_value",
    "block_reward_value",
    "vote_reward_value",
    "author_id",
  ];
  const values = blocks.map((block) => [
    block.id,
    block.sortId,
    block.height.toString(),
    block.hash,
    block.timestamp.toISOString(),
    block.parentHash,
    block.specId,
    block.stateRoot,
    block.extrinsicsRoot,
    block.spacePledged.toString(),
    block.blockchainSize.toString(),
    block.extrinsicsCount,
    block.eventsCount,
    block.logsCount,
    block.transfersCount,
    block.rewardsCount,
    block.blockRewardsCount,
    block.voteRewardsCount,
    block.transferValue.toString(),
    block.rewardValue.toString(),
    block.blockRewardValue.toString(),
    block.voteRewardValue.toString(),
    block.authorId,
  ]);
  return await insert("consensus.blocks", columns, values, sqlClient);
};

export const insertLogs = async (logs: CachedLog[], sqlClient?: typeof sql) => {
  if (logs.length === 0) return;

  const logsValues = logs.map((log) => [
    log.id,
    log.sortId,
    log.logId,
    log.blockId,
    log.blockHeight.toString(),
    log.blockHash,
    log.indexInBlock,
    log.kind,
    log.value,
    log.timestamp,
  ]);
  const logKindsValues = logs.map((log) => [log.kind, log.kind]);
  const logsColumns = [
    "id",
    "sort_id",
    "log_id",
    "block_id",
    "block_height",
    "block_hash",
    "index_in_block",
    "kind",
    "value",
    "timestamp",
  ];
  const logKindsColumns = ["id", "kind"];
  return await Promise.all([
    insert("consensus.logs", logsColumns, logsValues, sqlClient),
    insert(
      "consensus.log_kinds",
      logKindsColumns,
      logKindsValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
  ]);
};

export const insertExtrinsics = async (
  extrinsics: CachedExtrinsic[],
  sqlClient?: typeof sql
) => {
  if (extrinsics.length === 0) return;

  const extrinsicsValues = extrinsics.map((extrinsic) => [
    extrinsic.id,
    extrinsic.sortId,
    extrinsic.extrinsicId,
    extrinsic.hash,
    extrinsic.blockId,
    extrinsic.blockHeight.toString(),
    extrinsic.blockHash,
    extrinsic.section,
    extrinsic.module,
    extrinsic.name,
    extrinsic.indexInBlock,
    extrinsic.success,
    extrinsic.timestamp,
    extrinsic.nonce.toString(),
    extrinsic.signer,
    extrinsic.signature,
    extrinsic.eventsCount,
    extrinsic.args,
    extrinsic.error,
    extrinsic.tip.toString(),
    extrinsic.fee.toString(),
    extrinsic.pos,
    extrinsic.cid,
  ]);
  const extrinsicModulesValues = extrinsics.map((extrinsic) => [
    extrinsic.id,
    extrinsic.section,
    extrinsic.module,
  ]);
  const sectionsValues = extrinsics.map((extrinsic) => [
    extrinsic.id,
    extrinsic.section,
  ]);
  const extrinsicsColumns = [
    "id",
    "sort_id",
    "extrinsic_id",
    "hash",
    "block_id",
    "block_height",
    "block_hash",
    "section",
    "module",
    "name",
    "index_in_block",
    "success",
    "timestamp",
    "nonce",
    "signer",
    "signature",
    "events_count",
    "args",
    "error",
    "tip",
    "fee",
    "pos",
    "cid",
  ];
  const extrinsicModulesColumns = ["id", "section", "method"];
  const sectionsColumns = ["id", "section"];
  return await Promise.all([
    insert(
      "consensus.extrinsics",
      extrinsicsColumns,
      extrinsicsValues,
      sqlClient
    ),
    insert(
      "consensus.extrinsic_modules",
      extrinsicModulesColumns,
      extrinsicModulesValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
    insert(
      "consensus.sections",
      sectionsColumns,
      sectionsValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
  ]);
};

export const insertEvents = async (
  events: CachedEvent[],
  sqlClient?: typeof sql
) => {
  if (events.length === 0) return;

  const eventsValues = events.map((event) => [
    event.id,
    event.sortId,
    event.eventId,
    event.blockId,
    event.blockHeight.toString(),
    event.blockHash,
    event.extrinsicId,
    event.extrinsicHash,
    event.section,
    event.module,
    event.name,
    event.indexInBlock.toString(),
    event.timestamp,
    event.phase,
    event.pos,
    event.args,
    event.cid,
  ]);
  const eventModulesValues = events.map((event) => [
    event.id,
    event.section,
    event.module,
  ]);
  const sectionsValues = events.map((event) => [event.id, event.section]);
  const eventsColumns = [
    "id",
    "sort_id",
    "event_id",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "extrinsic_hash",
    "section",
    "module",
    "name",
    "index_in_block",
    "timestamp",
    "phase",
    "pos",
    "args",
    "cid",
  ];
  const eventModulesColumns = ["id", "section", "method"];
  const sectionsColumns = ["id", "section"];
  return await Promise.all([
    insert("consensus.events", eventsColumns, eventsValues, sqlClient),
    insert(
      "consensus.event_modules",
      eventModulesColumns,
      eventModulesValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
    insert(
      "consensus.sections",
      sectionsColumns,
      sectionsValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
  ]);
};

export const insertAccountHistories = async (
  accountHistories: CachedAccountHistory[],
  sqlClient?: typeof sql
) => {
  if (accountHistories.length === 0) return;

  const values = accountHistories.map((history) => [
    history.id,
    history.accountId,
    history.nonce.toString(),
    history.free.toString(),
    history.reserved.toString(),
    history.total.toString(),
    history.blockId,
    history.blockHeight.toString(),
    history.blockHash,
  ]);
  const columns = [
    "id",
    "account_id",
    "nonce",
    "free",
    "reserved",
    "total",
    "block_id",
    "block_height",
    "block_hash",
  ];
  return await insert(
    "consensus.account_histories",
    columns,
    values,
    sqlClient
  );
};

export const insertOrUpdateAccount = async (
  accountHistories: CachedAccountHistory[],
  sqlClient: typeof sql = sql
) => {
  if (accountHistories.length === 0) return;

  await Promise.all(
    accountHistories.map(
      (h) => sqlClient`
        INSERT INTO consensus.accounts (
          id,
          nonce,
          free,
          reserved,
          total,
          created_at,
          updated_at)
        VALUES (
          ${h.id},
          ${h.nonce.toString()},
          ${h.free.toString()},
          ${h.reserved.toString()},
          ${h.total.toString()},
          ${h.blockHeight.toString()},
          ${h.blockHeight.toString()})
        ON CONFLICT (id) DO UPDATE SET
          nonce = EXCLUDED.nonce,
          free = EXCLUDED.free,
          reserved = EXCLUDED.reserved,
          total = EXCLUDED.total,
          updated_at = ${h.blockHeight.toString()};`
    )
  );
};

export const insertTransfers = async (
  transfers: CachedTransfer[],
  sqlClient?: typeof sql
) => {
  if (transfers.length === 0) return;

  const values = transfers.map((transfer) => [
    transfer.id,
    transfer.blockId,
    transfer.blockHeight.toString(),
    transfer.blockHash,
    transfer.extrinsicId,
    transfer.eventId,
    transfer.from,
    transfer.fromChain,
    transfer.to,
    transfer.toChain,
    transfer.value.toString(),
    transfer.fee.toString(),
    transfer.type,
    transfer.success,
    transfer.isFinalized,
    transfer.timestamp,
  ]);
  const columns = [
    "id",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "event_id",
    '"from"', // Note the quotes for the reserved keyword
    "from_chain",
    '"to"', // Note the quotes for the reserved keyword
    "to_chain",
    "value",
    "fee",
    "type",
    "success",
    "is_finalized",
    "timestamp",
  ];
  return await Promise.all([
    insert("consensus.transfers", columns, values, sqlClient),
    insert("transfers.transfers", columns, values, sqlClient),
  ]);
};

export const insertRewards = async (
  rewards: CachedReward[],
  sqlClient?: typeof sql
) => {
  if (rewards.length === 0) return;

  const values = rewards.map((reward) => [
    reward.id,
    reward.blockId,
    reward.blockHeight.toString(),
    reward.blockHash,
    reward.extrinsicId,
    reward.eventId,
    reward.accountId,
    reward.rewardType,
    reward.amount.toString(),
    reward.timestamp,
  ]);
  const columns = [
    "id",
    "block_id",
    "block_height",
    "block_hash",
    "extrinsic_id",
    "event_id",
    "account_id",
    "reward_type",
    "amount",
    "timestamp",
  ];
  return await insert("consensus.rewards", columns, values, sqlClient);
};

export const insertCachedConsensusData = (cache: Cache, txSql: typeof sql) => {
  const promises = [];

  if (cache.blocks.length > 0) promises.push(insertBlocks(cache.blocks, txSql));

  if (cache.logs.length > 0) promises.push(insertLogs(cache.logs, txSql));

  if (cache.extrinsics.length > 0)
    promises.push(insertExtrinsics(cache.extrinsics, txSql));

  if (cache.events.length > 0) promises.push(insertEvents(cache.events, txSql));

  if (cache.transfers.length > 0)
    promises.push(insertTransfers(cache.transfers, txSql));

  if (cache.rewards.length > 0)
    promises.push(insertRewards(cache.rewards, txSql));

  if (cache.accountHistories.length > 0)
    promises.push(
      insertAccountHistories(cache.accountHistories, txSql),
      insertOrUpdateAccount(cache.accountHistories, txSql)
    );

  if (promises.length === 0) return [];

  return promises;
};
