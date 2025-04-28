import { CHALLENGE_PERIOD, ZERO_BIGINT } from "../structures/constants.ts";
import {
  Cache,
  CachedBundleSubmission,
  CachedDepositEvent,
  CachedDomainInstantiation,
  CachedDomainStakingHistory,
  CachedNominatorsUnlockedEvent,
  CachedOperatorDeregistration,
  CachedOperatorRegistration,
  CachedOperatorReward,
  CachedOperatorStakingHistory,
  CachedOperatorTaxCollection,
  CachedRuntimeCreation,
  CachedUnlockedEvent,
  CachedWithdrawEvent,
} from "../types/cache.ts";
import { sql } from "./client.ts";
import { insert } from "./helper.ts";

export const insertBundleSubmissions = async (
  bundleSubmissions: CachedBundleSubmission[],
  sqlClient?: typeof sql
) => {
  if (bundleSubmissions.length === 0) return;

  const values = bundleSubmissions.map((submission) => [
    submission.id,
    submission.accountId,
    submission.bundleId,
    submission.domainId,
    submission.domainBlockId,
    submission.operatorId,
    submission.domainBlockNumber.toString(),
    submission.domainBlockHash,
    submission.domainBlockExtrinsicRoot,
    submission.epoch.toString(),
    submission.consensusBlockNumber.toString(),
    submission.consensusBlockHash,
    submission.totalTransfersIn.toString(),
    submission.transfersInCount.toString(),
    submission.totalTransfersOut.toString(),
    submission.transfersOutCount.toString(),
    submission.totalRejectedTransfersClaimed.toString(),
    submission.rejectedTransfersClaimedCount.toString(),
    submission.totalTransfersRejected.toString(),
    submission.transfersRejectedCount.toString(),
    submission.totalVolume.toString(),
    submission.consensusStorageFee.toString(),
    submission.domainExecutionFee.toString(),
    submission.burnedBalance.toString(),
    submission.blockHeight.toString(),
    submission.extrinsicId,
    submission.eventId,
  ]);
  const columns = [
    "id",
    "account_id",
    "bundle_id",
    "domain_id",
    "domain_block_id",
    "operator_id",
    "domain_block_number",
    "domain_block_hash",
    "domain_block_extrinsic_root",
    "epoch",
    "consensus_block_number",
    "consensus_block_hash",
    "total_transfers_in",
    "transfers_in_count",
    "total_transfers_out",
    "transfers_out_count",
    "total_rejected_transfers_claimed",
    "rejected_transfers_claimed_count",
    "total_transfers_rejected",
    "transfers_rejected_count",
    "total_volume",
    "consensus_storage_fee",
    "domain_execution_fee",
    "burned_balance",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert("staking.bundle_submissions", columns, values, sqlClient);
};

export const insertRuntimeCreations = async (
  runtimeCreations: CachedRuntimeCreation[],
  sqlClient?: typeof sql
) => {
  if (runtimeCreations.length === 0) return;

  const values = runtimeCreations.map((creation) => [
    creation.id,
    creation.sortId,
    creation.name,
    creation.type,
    creation.createdBy,
    creation.blockHeight.toString(),
    creation.extrinsicId,
    creation.eventId,
  ]);
  const columns = [
    "id",
    "sort_id",
    "name",
    "type",
    "created_by",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert("staking.runtime_creations", columns, values, sqlClient);
};

export const insertDomains = async (
  domainInstantiations: CachedDomainInstantiation[],
  sqlClient?: typeof sql
) => {
  if (domainInstantiations.length === 0) return;

  const values = domainInstantiations.map((instantiation) => [
    instantiation.id,
    instantiation.sortId,
    instantiation.createdBy,
    instantiation.name,
    instantiation.runtimeId,
    instantiation.runtime,
    instantiation.runtimeInfo,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    instantiation.extrinsicId,
    instantiation.blockHeight.toString(),
    instantiation.blockHeight.toString(),
  ]);
  const columns = [
    "id",
    "sort_id",
    "account_id",
    "name",
    "runtime_id",
    "runtime",
    "runtime_info",
    "completed_epoch",
    "last_domain_block_number",
    "total_deposits",
    "total_estimated_withdrawals",
    "total_withdrawals",
    "total_deposits_count",
    "total_withdrawals_count",
    "total_tax_collected",
    "total_rewards_collected",
    "total_transfers_in",
    "transfers_in_count",
    "total_transfers_out",
    "transfers_out_count",
    "total_rejected_transfers_claimed",
    "rejected_transfers_claimed_count",
    "total_transfers_rejected",
    "transfers_rejected_count",
    "total_volume",
    "total_consensus_storage_fee",
    "total_domain_execution_fee",
    "total_burned_balance",
    "current_total_stake",
    "current_storage_fee_deposit",
    "current_total_shares",
    "current_share_price",
    "current_1d_yield",
    "current_7d_yield",
    "current_30d_yield",
    "current_1d_apy",
    "current_7d_apy",
    "current_30d_apy",
    "accumulated_epoch_stake",
    "accumulated_epoch_storage_fee_deposit",
    "accumulated_epoch_rewards",
    "accumulated_epoch_shares",
    "bundle_count",
    "reward_count",
    "tax_collected_count",
    "current_epoch_duration",
    "last_epoch_duration",
    "last6_epochs_duration",
    "last144_epoch_duration",
    "last1k_epoch_duration",
    "last_bundle_at",
    "extrinsic_id",
    "created_at",
    "updated_at",
  ];
  return await insert("staking.domains", columns, values, sqlClient);
};

export const insertDomainInstantiations = async (
  domainInstantiations: CachedDomainInstantiation[],
  sqlClient?: typeof sql
) => {
  if (domainInstantiations.length === 0) return;

  const values = domainInstantiations.map((instantiation) => [
    instantiation.id,
    instantiation.sortId,
    instantiation.name,
    instantiation.runtimeId,
    instantiation.runtime,
    instantiation.runtimeInfo,
    instantiation.createdBy,
    instantiation.blockHeight.toString(),
    instantiation.extrinsicId,
    instantiation.eventId,
  ]);
  const columns = [
    "id",
    "sort_id",
    "name",
    "runtime_id",
    "runtime",
    "runtime_info",
    "created_by",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert(
    "staking.domain_instantiations",
    columns,
    values,
    sqlClient
  );
};

export const insertOperators = async (
  operatorRegistrations: CachedOperatorRegistration[],
  sqlClient?: typeof sql
) => {
  if (operatorRegistrations.length === 0) return;

  const values = operatorRegistrations.map((registration) => [
    registration.id,
    registration.sortId,
    registration.owner,
    registration.domainId,
    registration.signingKey,
    registration.minimumNominatorStake.toString(),
    registration.nominationTax,
    0, // current_total_stake
    0, // current_storage_fee_deposit
    0, // current_epoch_rewards
    0, // current_total_shares
    0, // current_share_price
    '{"registered":null}', // raw_status
    0, // total_deposits
    0, // total_estimated_withdrawals
    0, // total_withdrawals
    0, // total_deposits_count
    0, // total_withdrawals_count
    0, // total_tax_collected
    0, // total_rewards_collected
    0, // accumulated_epoch_stake
    0, // accumulated_epoch_storage_fee_deposit
    0, // accumulated_epoch_rewards
    0, // accumulated_epoch_shares
    0, // active_epoch_count
    0, // bundle_count
    0, // reward_count
    0, // tax_collected_count
    0, // current_1d_yield
    0, // current_7d_yield
    0, // current_30d_yield
    0, // current_1d_apy
    0, // current_7d_apy
    0, // current_30d_apy
    "PENDING_NEXT_EPOCH", // status
    0, // last_bundle_at
    registration.extrinsicId,
    registration.blockHeight.toString(),
    registration.blockHeight.toString(),
  ]);
  const columns = [
    "id",
    "sort_id",
    "account_id",
    "domain_id",
    "signing_key",
    "minimum_nominator_stake",
    "nomination_tax",
    "current_total_stake",
    "current_storage_fee_deposit",
    "current_epoch_rewards",
    "current_total_shares",
    "current_share_price",
    "raw_status",
    "total_deposits",
    "total_estimated_withdrawals",
    "total_withdrawals",
    "total_deposits_count",
    "total_withdrawals_count",
    "total_tax_collected",
    "total_rewards_collected",
    "accumulated_epoch_stake",
    "accumulated_epoch_storage_fee_deposit",
    "accumulated_epoch_rewards",
    "accumulated_epoch_shares",
    "active_epoch_count",
    "bundle_count",
    "reward_count",
    "tax_collected_count",
    "current_1d_yield",
    "current_7d_yield",
    "current_30d_yield",
    "current_1d_apy",
    "current_7d_apy",
    "current_30d_apy",
    "status",
    "last_bundle_at",
    "extrinsic_id",
    "created_at",
    "updated_at",
  ];
  return await insert("staking.operators", columns, values, sqlClient);
};

export const insertOperatorRegistrations = async (
  operatorRegistrations: CachedOperatorRegistration[],
  sqlClient?: typeof sql
) => {
  if (operatorRegistrations.length === 0) return;

  const values = operatorRegistrations.map((registration) => [
    registration.id,
    registration.sortId,
    registration.owner,
    registration.domainId,
    registration.signingKey,
    registration.minimumNominatorStake.toString(),
    registration.nominationTax,
    registration.blockHeight.toString(),
    registration.extrinsicId,
    registration.eventId,
  ]);
  const columns = [
    "id",
    "sort_id",
    "owner",
    "domain_id",
    "signing_key",
    "minimum_nominator_stake",
    "nomination_tax",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert(
    "staking.operator_registrations",
    columns,
    values,
    sqlClient
  );
};

export const insertOperatorDeregistrations = async (
  operatorDeregistrations: CachedOperatorDeregistration[],
  sqlClient: typeof sql = sql
) => {
  if (operatorDeregistrations.length === 0) return;

  const values = operatorDeregistrations.map((deregistration) => [
    deregistration.id,
    deregistration.owner,
    deregistration.domainId,
    deregistration.blockHeight.toString(),
    deregistration.extrinsicId,
    deregistration.eventId,
  ]);
  const columns = [
    "id",
    "owner",
    "domain_id",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await Promise.all([
    insert("staking.operator_deregistrations", columns, values, sqlClient),
    ...operatorDeregistrations.map(
      (deregistration) =>
        sqlClient`UPDATE staking.operators
          SET 
            status = 'DEREGISTERED',
            updated_at = ${deregistration.blockHeight.toString()}
          WHERE id = ${deregistration.id}`
    ),
  ]);
};

export const insertDepositEvents = async (
  depositEvents: CachedDepositEvent[],
  sqlClient?: typeof sql
) => {
  if (depositEvents.length === 0) return;

  const depositsValues = depositEvents.map((event) => [
    event.id,
    event.accountId,
    event.domainId,
    event.operatorId,
    event.nominatorId,
    event.amount.toString(),
    event.storageFeeDeposit.toString(),
    event.totalAmount.toString(),
    event.estimatedShares.toString(),
    0, // total_withdrawn
    "PENDING_NEXT_EPOCH", // status
    event.timestamp,
    event.extrinsicId,
    event.blockHeight.toString(),
    event.blockHeight.toString(),
  ]);
  const depositEventsValues = depositEvents.map((event) => [
    event.id,
    event.sortId,
    event.accountId,
    event.domainId,
    event.operatorId,
    event.nominatorId,
    event.amount.toString(),
    event.storageFeeDeposit.toString(),
    event.totalAmount.toString(),
    event.estimatedShares.toString(),
    event.timestamp,
    event.blockHeight.toString(),
    event.extrinsicId,
    event.eventId,
  ]);
  const depositsColumns = [
    "id",
    "account_id",
    "domain_id",
    "operator_id",
    "nominator_id",
    "amount",
    "storage_fee_deposit",
    "total_amount",
    "estimated_shares",
    "total_withdrawn",
    "status",
    '"timestamp"', // Reserved keyword
    "extrinsic_id",
    "created_at",
    "updated_at",
  ];
  const depositEventColumns = [
    "id",
    "sort_id",
    "account_id",
    "domain_id",
    "operator_id",
    "nominator_id",
    "amount",
    "storage_fee_deposit",
    "total_amount",
    "estimated_shares",
    '"timestamp"', // Reserved keyword
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await Promise.all([
    insert("staking.deposits", depositsColumns, depositsValues, sqlClient),
    insert(
      "staking.deposit_events",
      depositEventColumns,
      depositEventsValues,
      sqlClient
    ),
  ]);
};

export const insertWithdrawEvents = async (
  withdrawEvents: CachedWithdrawEvent[],
  cache: Cache,
  sqlClient?: typeof sql
) => {
  if (withdrawEvents.length === 0) return;

  const withdrawsValues = withdrawEvents.map((event) => [
    event.id,
    event.accountId,
    event.domainId,
    event.operatorId,
    event.nominatorId,
    event.shares.toString(),
    event.storageFeeRefund.toString(),
    event.estimatedAmount.toString(),
    0, // unlocked_amount
    0, // unlocked_storage_fee
    0, // total_amount
    "PENDING_NEXT_EPOCH", // status
    event.timestamp,
    event.extrinsicId,
    0, // unlock_extrinsic_id
    (cache.lastDomainEpoch.get(event.domainId) || ZERO_BIGINT).toString(), // epoch_withdrawal_requested_at
    (cache.lastDomainBlockNumber.get(event.domainId) || ZERO_BIGINT).toString(), // domain_block_number_withdrawal_requested_at
    event.blockHeight.toString(),
    (
      (cache.lastDomainBlockNumber.get(event.domainId) || ZERO_BIGINT) +
      CHALLENGE_PERIOD
    ).toString(), // domain_block_number_ready_at
    0, // unlocked_at
    event.blockHeight.toString(),
  ]);
  const withdrawEventsValues = withdrawEvents.map((event) => [
    event.id,
    event.sortId,
    event.accountId,
    event.domainId,
    event.operatorId,
    event.nominatorId,
    event.toWithdraw,
    event.shares.toString(),
    event.storageFeeRefund.toString(),
    event.estimatedAmount.toString(),
    event.timestamp,
    event.blockHeight.toString(),
    event.extrinsicId,
    event.eventId,
  ]);
  const withdrawsColumns = [
    "id",
    "account_id",
    "domain_id",
    "operator_id",
    "nominator_id",
    "shares",
    "storage_fee_refund",
    "estimated_amount",
    "unlocked_amount",
    "unlocked_storage_fee",
    "total_amount",
    "status",
    '"timestamp"', // Reserved keyword
    "withdraw_extrinsic_id",
    "unlock_extrinsic_id",
    "epoch_withdrawal_requested_at",
    "domain_block_number_withdrawal_requested_at",
    "created_at",
    "domain_block_number_ready_at",
    "unlocked_at",
    "updated_at",
  ];
  const withdrawEventsColumns = [
    "id",
    "sort_id",
    "account_id",
    "domain_id",
    "operator_id",
    "nominator_id",
    "to_withdraw",
    "shares",
    "storage_fee_refund",
    "estimated_amount",
    '"timestamp"', // Reserved keyword
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await Promise.all([
    insert("staking.withdrawals", withdrawsColumns, withdrawsValues, sqlClient),
    ,
    insert(
      "staking.withdraw_events",
      withdrawEventsColumns,
      withdrawEventsValues,
      sqlClient
    ),
  ]);
};

export const insertUnlockedEvents = async (
  unlockedEvents: CachedUnlockedEvent[],
  sqlClient?: typeof sql
) => {
  if (unlockedEvents.length === 0) return;

  const values = unlockedEvents.map((event) => [
    event.id,
    event.domainId,
    event.operatorId,
    event.accountId,
    event.nominatorId,
    event.amount.toString(),
    event.storageFee.toString(),
    event.timestamp,
    event.blockHeight.toString(),
    event.extrinsicId,
    event.eventId,
  ]);
  const columns = [
    "id",
    "domain_id",
    "operator_id",
    "account_id",
    "nominator_id",
    "amount",
    "storage_fee",
    '"timestamp"', // Reserved keyword
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert("staking.unlocked_events", columns, values, sqlClient);
};

export const insertNominatorsUnlockedEvents = async (
  nominatorsUnlockedEvents: CachedNominatorsUnlockedEvent[],
  sqlClient: typeof sql = sql
) => {
  if (nominatorsUnlockedEvents.length === 0) return;

  const values = nominatorsUnlockedEvents.map((event) => [
    event.id,
    event.domainId,
    event.operatorId,
    event.blockHeight.toString(),
    event.extrinsicId,
    event.eventId,
  ]);
  const columns = [
    "id",
    "domain_id",
    "operator_id",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await Promise.all([
    insert("staking.nominators_unlocked_events", columns, values, sqlClient),
    ...nominatorsUnlockedEvents.map(
      (event) =>
        sqlClient`UPDATE staking.operators
          SET 
            status = 'NOMINATORS_UNLOCKED',
            updated_at = ${event.blockHeight.toString()}
          WHERE id = ${event.operatorId}`
    ),
  ]);
};

export const insertOperatorRewards = async (
  operatorRewards: CachedOperatorReward[],
  sqlClient?: typeof sql
) => {
  if (operatorRewards.length === 0) return;

  const values = operatorRewards.map((reward) => [
    reward.id,
    reward.domainId,
    reward.operatorId,
    reward.amount.toString(),
    reward.atBlockNumber.toString(),
    reward.blockHeight.toString(),
    reward.extrinsicId,
    reward.eventId,
  ]);
  const columns = [
    "id",
    "domain_id",
    "operator_id",
    "amount",
    "at_block_number",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert("staking.operator_rewards", columns, values, sqlClient);
};

export const insertOperatorTaxCollections = async (
  operatorTaxCollections: CachedOperatorTaxCollection[],
  sqlClient?: typeof sql
) => {
  if (operatorTaxCollections.length === 0) return;

  const values = operatorTaxCollections.map((taxCollection) => [
    taxCollection.id,
    taxCollection.domainId,
    taxCollection.operatorId,
    taxCollection.amount.toString(),
    taxCollection.blockHeight.toString(),
    taxCollection.extrinsicId,
    taxCollection.eventId,
  ]);
  const columns = [
    "id",
    "domain_id",
    "operator_id",
    "amount",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert(
    "staking.operator_tax_collections",
    columns,
    values,
    sqlClient
  );
};

export const insertDomainStakingHistories = async (
  domainStakingHistories: CachedDomainStakingHistory[],
  sqlClient?: typeof sql
) => {
  if (domainStakingHistories.length === 0) return;

  const values = domainStakingHistories.map((history) => [
    history.id,
    history.domainId,
    history.currentEpochIndex,
    history.currentTotalStake.toString(),
    history.currentTotalShares.toString(),
    history.sharePrice.toString(),
    history.timestamp,
    history.blockHeight.toString(),
  ]);
  const columns = [
    "id",
    "domain_id",
    "current_epoch_index",
    "current_total_stake",
    "current_total_shares",
    "share_price",
    "timestamp",
    "block_height",
  ];
  return await insert(
    "staking.domain_staking_histories",
    columns,
    values,
    sqlClient,
    "(id) DO NOTHING"
  );
};

export const insertOperatorStakingHistories = async (
  operatorStakingHistories: CachedOperatorStakingHistory[],
  sqlClient?: typeof sql
) => {
  if (operatorStakingHistories.length === 0) return;

  const values = operatorStakingHistories.map((history) => [
    history.id,
    history.operatorId,
    history.operatorOwner,
    history.signingKey,
    history.currentDomainId,
    history.currentTotalStake.toString(),
    history.currentTotalShares.toString(),
    history.depositsInEpoch.toString(),
    history.withdrawalsInEpoch.toString(),
    history.totalStorageFeeDeposit.toString(),
    history.sharePrice.toString(),
    history.partialStatus,
    history.timestamp,
    history.blockHeight.toString(),
  ]);
  const columns = [
    "id",
    "operator_id",
    "operator_owner",
    "signing_key",
    "current_domain_id",
    "current_total_stake",
    "current_total_shares",
    "deposits_in_epoch",
    "withdrawals_in_epoch",
    "total_storage_fee_deposit",
    "share_price",
    "partial_status",
    "timestamp",
    "block_height",
  ];
  return await insert(
    "staking.operator_staking_histories",
    columns,
    values,
    sqlClient,
    "(id) DO NOTHING"
  );
};

export const insertCachedStakingData = (cache: Cache, txSql: typeof sql) => {
  const promises = [];

  if (cache.bundleSubmission?.length > 0)
    promises.push(insertBundleSubmissions(cache.bundleSubmission, txSql));

  if (cache.runtimeCreation?.length > 0)
    promises.push(insertRuntimeCreations(cache.runtimeCreation, txSql));

  if (cache.domainInstantiation?.length > 0)
    promises.push(
      insertDomains(cache.domainInstantiation, txSql),
      insertDomainInstantiations(cache.domainInstantiation, txSql)
    );

  if (cache.operatorRegistration?.length > 0)
    promises.push(
      insertOperators(cache.operatorRegistration, txSql),
      insertOperatorRegistrations(cache.operatorRegistration, txSql)
    );

  if (cache.operatorDeregistration?.length > 0)
    promises.push(
      insertOperatorDeregistrations(cache.operatorDeregistration, txSql)
    );

  if (cache.depositEvent?.length > 0)
    promises.push(insertDepositEvents(cache.depositEvent, txSql));

  if (cache.withdrawEvent?.length > 0)
    promises.push(insertWithdrawEvents(cache.withdrawEvent, cache, txSql));

  if (cache.unlockedEvent?.length > 0)
    promises.push(insertUnlockedEvents(cache.unlockedEvent, txSql));

  if (cache.nominatorsUnlockedEvent?.length > 0)
    promises.push(
      insertNominatorsUnlockedEvents(cache.nominatorsUnlockedEvent, txSql)
    );

  if (cache.operatorReward?.length > 0)
    promises.push(insertOperatorRewards(cache.operatorReward, txSql));

  if (cache.operatorTaxCollection?.length > 0)
    promises.push(
      insertOperatorTaxCollections(cache.operatorTaxCollection, txSql)
    );

  if (cache.domainStakingHistory?.length > 0)
    promises.push(
      insertDomainStakingHistories(cache.domainStakingHistory, txSql)
    );

  if (cache.operatorStakingHistory?.length > 0)
    promises.push(
      insertOperatorStakingHistories(cache.operatorStakingHistory, txSql)
    );

  if (promises.length === 0) return [];

  return promises;
};
