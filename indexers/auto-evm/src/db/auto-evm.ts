import {
  Cache,
  CachedAccountHistory,
  CachedBlock,
  CachedEvent,
  CachedEvmBlock,
  CachedEvmCode,
  CachedEvmCodeSelector,
  CachedEvmTransaction,
  CachedExtrinsic,
  CachedLog,
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
    "extrinsics_count",
    "events_count",
    "logs_count",
    "transfers_count",
    "transfer_value",
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
    block.extrinsicsCount,
    block.eventsCount,
    block.logsCount,
    block.transfersCount,
    block.transferValue.toString(),
    block.authorId,
  ]);
  return await insert("domain_auto_evm.blocks", columns, values, sqlClient);
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
    insert("domain_auto_evm.logs", logsColumns, logsValues, sqlClient),
    insert(
      "domain_auto_evm.log_kinds",
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
  ];
  const extrinsicModulesColumns = ["id", "section", "method"];
  const sectionsColumns = ["id", "section"];
  return await Promise.all([
    insert(
      "domain_auto_evm.extrinsics",
      extrinsicsColumns,
      extrinsicsValues,
      sqlClient
    ),
    insert(
      "domain_auto_evm.extrinsic_modules",
      extrinsicModulesColumns,
      extrinsicModulesValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
    insert(
      "domain_auto_evm.sections",
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
  ];
  const eventModulesColumns = ["id", "section", "method"];
  const sectionsColumns = ["id", "section"];
  return await Promise.all([
    insert("domain_auto_evm.events", eventsColumns, eventsValues, sqlClient),
    insert(
      "domain_auto_evm.event_modules",
      eventModulesColumns,
      eventModulesValues,
      sqlClient,
      "(id) DO NOTHING"
    ),
    insert(
      "domain_auto_evm.sections",
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
    "domain_auto_evm.account_histories",
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
        INSERT INTO domain_auto_evm.accounts (
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
    insert("domain_auto_evm.transfers", columns, values, sqlClient),
    insert("transfers.transfers", columns, values, sqlClient),
  ]);
};

export const insertEvmBlocks = async (
  evmBlocks: CachedEvmBlock[],
  sqlClient?: typeof sql
) => {
  if (evmBlocks.length === 0) return;

  const values = evmBlocks.map((block) => [
    block.id,
    block.sortId,
    block.height.toString(),
    block.hash,
    block.timestamp,
    block.blockTimestamp,
    block.parentHash,
    block.stateRoot,
    block.transactionsRoot,
    block.receiptsRoot,
    block.transactionsCount,
    block.transferValue.toString(),
    block.authorId,
    block.gasUsed.toString(),
    block.gasLimit.toString(),
    block.extraData,
    block.difficulty.toString(),
    block.totalDifficulty.toString(),
    block.size.toString(),
  ]);
  const columns = [
    "id",
    "sort_id",
    "height",
    "hash",
    "timestamp",
    "block_timestamp",
    "parent_hash",
    "state_root",
    "transactions_root",
    "receipts_root",
    "transactions_count",
    "transfer_value",
    "author_id",
    "gas_used",
    "gas_limit",
    "extra_data",
    "difficulty",
    "total_difficulty",
    "size",
  ];
  return await insert("domain_auto_evm.evm_blocks", columns, values, sqlClient);
};

export const insertEvmTransactions = async (
  evmTransactions: CachedEvmTransaction[],
  sqlClient?: typeof sql
) => {
  if (evmTransactions.length === 0) return;

  const values = evmTransactions.map((transaction) => [
    transaction.id,
    transaction.sortId,
    transaction.hash,
    transaction.nonce.toString(),
    transaction.blockHash,
    transaction.blockNumber.toString(),
    transaction.timestamp,
    transaction.blockTimestamp,
    transaction.transactionIndex.toString(),
    transaction.from,
    transaction.to,
    transaction.value.toString(),
    transaction.gasPrice.toString(),
    transaction.maxFeePerGas.toString(),
    transaction.maxPriorityFeePerGas.toString(),
    transaction.gas.toString(),
    transaction.input,
    transaction.creates,
    transaction.raw,
    transaction.publicKey,
    transaction.chainId.toString(),
    transaction.standardV.toString(),
    transaction.v,
    transaction.r,
    transaction.s,
    transaction.accessList,
    transaction.transactionType.toString(),
  ]);
  const columns = [
    "id",
    "sort_id",
    "hash",
    "nonce",
    "block_hash",
    "block_number",
    "timestamp",
    "block_timestamp",
    "transaction_index",
    '"from"', // Note the quotes for the reserved keyword
    '"to"', // Note the quotes for the reserved keyword
    "value",
    "gas_price",
    "max_fee_per_gas",
    "max_priority_fee_per_gas",
    "gas",
    "input",
    "creates",
    "raw",
    "public_key",
    "chain_id",
    "standard_v",
    "v",
    "r",
    "s",
    "access_list",
    "transaction_type",
  ];
  return await insert(
    "domain_auto_evm.evm_transactions",
    columns,
    values,
    sqlClient
  );
};

export const insertEvmCodeSelectors = async (
  evmCodeSelectors: CachedEvmCodeSelector[],
  sqlClient?: typeof sql
) => {
  if (evmCodeSelectors.length === 0) return;

  const values = evmCodeSelectors.map((selector) => [
    selector.id,
    selector.address,
    selector.selector,
    selector.name,
    selector.signature,
  ]);
  const columns = ["id", "address", "selector", "name", "signature"];
  return await insert(
    "domain_auto_evm.evm_code_selectors",
    columns,
    values,
    sqlClient,
    "(id) DO NOTHING"
  );
};

export const insertEvmCodes = async (
  evmCodes: CachedEvmCode[],
  sqlClient?: typeof sql
) => {
  if (evmCodes.length === 0) return;

  const values = evmCodes.map((code) => [
    code.id,
    code.address,
    code.code,
    code.abi,
  ]);
  const columns = ["id", "address", "code", "abi"];
  return await insert("domain_auto_evm.evm_codes", columns, values, sqlClient);
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

  if (cache.accountHistories.length > 0)
    promises.push(
      insertAccountHistories(cache.accountHistories, txSql),
      insertOrUpdateAccount(cache.accountHistories, txSql)
    );

  if (cache.evmBlocks.length > 0)
    promises.push(insertEvmBlocks(cache.evmBlocks, txSql));

  if (cache.evmTransactions.length > 0)
    promises.push(insertEvmTransactions(cache.evmTransactions, txSql));

  if (cache.evmCodeSelectors.length > 0)
    promises.push(insertEvmCodeSelectors(cache.evmCodeSelectors, txSql));

  if (cache.evmCodes.length > 0)
    promises.push(insertEvmCodes(cache.evmCodes, txSql));

  if (promises.length === 0) return [];

  return promises;
};
