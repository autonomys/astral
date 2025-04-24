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
  sqlClient?: typeof sql
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
  return await insert(
    "staking.operator_deregistrations",
    columns,
    values,
    sqlClient
  );
};

export const insertDepositEvents = async (
  depositEvents: CachedDepositEvent[],
  sqlClient?: typeof sql
) => {
  if (depositEvents.length === 0) return;

  const values = depositEvents.map((event) => [
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
  const columns = [
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
  return await insert("staking.deposit_events", columns, values, sqlClient);
};

export const insertWithdrawEvents = async (
  withdrawEvents: CachedWithdrawEvent[],
  sqlClient?: typeof sql
) => {
  if (withdrawEvents.length === 0) return;

  const values = withdrawEvents.map((event) => [
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
  const columns = [
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
  return await insert("staking.withdraw_events", columns, values, sqlClient);
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
  sqlClient?: typeof sql
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
  return await insert(
    "staking.nominators_unlocked_events",
    columns,
    values,
    sqlClient
  );
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
    sqlClient
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
    sqlClient
  );
};

export const insertCachedStakingData = (cache: Cache, txSql: typeof sql) => {
  const promises = [];

  if (cache.bundleSubmission?.length > 0)
    promises.push(insertBundleSubmissions(cache.bundleSubmission, txSql));

  if (cache.runtimeCreation?.length > 0)
    promises.push(insertRuntimeCreations(cache.runtimeCreation, txSql));

  if (cache.domainInstantiation?.length > 0)
    promises.push(insertDomainInstantiations(cache.domainInstantiation, txSql));

  if (cache.operatorRegistration?.length > 0)
    promises.push(
      insertOperatorRegistrations(cache.operatorRegistration, txSql)
    );

  if (cache.operatorDeregistration?.length > 0)
    promises.push(
      insertOperatorDeregistrations(cache.operatorDeregistration, txSql)
    );

  if (cache.depositEvent?.length > 0)
    promises.push(insertDepositEvents(cache.depositEvent, txSql));

  if (cache.withdrawEvent?.length > 0)
    promises.push(insertWithdrawEvents(cache.withdrawEvent, txSql));

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
