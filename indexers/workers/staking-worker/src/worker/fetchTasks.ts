import * as services from '../services';

/**
 * Fetch staking tasks (deposits, withdrawals, and unlock events) that need processing
 */
export const fetchStakingTasks = async (
  batchSize: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
  const tasks: any[] = [];

  // Calculate batch size for each type (split evenly between 9 types now)
  const taskTypes = 9;
  const baseLimit = Math.floor(batchSize / taskTypes);
  const unlocksLimit = baseLimit;
  const depositsLimit = baseLimit;
  const withdrawalsLimit = baseLimit;
  const operatorRegistrationsLimit = baseLimit;
  const operatorRewardsLimit = baseLimit;
  const operatorTaxLimit = baseLimit;
  const bundleSubmissionsLimit = baseLimit;
  const operatorDeregistrationsLimit = baseLimit;
  const nominatorsUnlockedLimit = batchSize - baseLimit * (taskTypes - 1); // Take any remainder

  try {
    // Fetch unprocessed deposits
    const deposits = await services.fetchUnprocessedDeposits(depositsLimit, maxBlockHeight);

    // Convert to DepositTask format
    for (const deposit of deposits) {
      tasks.push({
        type: 'deposit',
        id: deposit.id,
        operatorId: deposit.operator_id,
        domainId: deposit.domain_id,
        address: deposit.address,
        timestamp: deposit.timestamp,
        knownShares: deposit.known_shares,
        knownStorageFeeDeposit: deposit.known_storage_fee_deposit,
        pendingAmount: deposit.pending_amount,
        pendingStorageFeeDeposit: deposit.pending_storage_fee_deposit,
        pendingEffectiveDomainEpoch: deposit.pending_effective_domain_epoch,
      });
    }

    // Fetch unprocessed withdrawals
    const withdrawals = await services.fetchUnprocessedWithdrawals(
      withdrawalsLimit,
      maxBlockHeight,
    );

    // Convert to WithdrawalTask format
    for (const withdrawal of withdrawals) {
      tasks.push({
        type: 'withdrawal',
        id: withdrawal.id,
        operatorId: withdrawal.operator_id,
        domainId: withdrawal.domain_id,
        address: withdrawal.address,
        timestamp: withdrawal.timestamp,
        withdrawalInSharesAmount: withdrawal.withdrawal_in_shares_amount,
        withdrawalInSharesStorageFeeRefund: withdrawal.withdrawal_in_shares_storage_fee_refund,
        withdrawalInSharesDomainEpoch: withdrawal.withdrawal_in_shares_domain_epoch,
        withdrawalInSharesUnlockBlock: withdrawal.withdrawal_in_shares_unlock_block,
        totalWithdrawalAmount: withdrawal.total_withdrawal_amount,
        totalStorageFeeWithdrawal: withdrawal.total_storage_fee_withdrawal,
        withdrawalsJson: withdrawal.withdrawals_json,
      });
    }

    // Fetch unprocessed unlock events
    const unlocks = await services.fetchUnprocessedUnlocks(unlocksLimit, maxBlockHeight);

    // Convert to UnlockTask format
    for (const unlock of unlocks) {
      tasks.push({
        type: 'unlock',
        id: unlock.id,
        operatorId: unlock.operator_id,
        domainId: unlock.domain_id,
        address: unlock.address,
        nominatorId: unlock.nominator_id,
        amount: unlock.amount,
        storageFee: unlock.storage_fee,
        eventId: unlock.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed operator registrations
    const operatorRegistrations = await services.fetchUnprocessedOperatorRegistrations(
      operatorRegistrationsLimit,
      maxBlockHeight,
    );

    // Convert to OperatorRegistrationTask format
    for (const registration of operatorRegistrations) {
      tasks.push({
        type: 'operator-registration',
        id: registration.id,
        operatorId: registration.id, // The registration ID is the operator ID
        domainId: registration.domain_id,
        address: registration.owner,
        owner: registration.owner,
        signingKey: registration.signing_key,
        minimumNominatorStake: registration.minimum_nominator_stake,
        nominationTax: registration.nomination_tax,
        blockHeight: registration.block_height,
        extrinsicId: registration.extrinsic_id,
        eventId: registration.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed operator rewards
    const operatorRewards = await services.fetchUnprocessedOperatorRewards(
      operatorRewardsLimit,
      maxBlockHeight,
    );

    // Convert to OperatorRewardTask format
    for (const reward of operatorRewards) {
      tasks.push({
        type: 'operator-reward',
        id: reward.id,
        operatorId: reward.operator_id,
        domainId: reward.domain_id,
        address: '', // Not needed for rewards
        amount: reward.amount,
        atBlockNumber: reward.at_block_number,
        blockHeight: reward.block_height,
        extrinsicId: reward.extrinsic_id,
        eventId: reward.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed operator tax collections
    const operatorTaxCollections = await services.fetchUnprocessedOperatorTaxCollections(
      operatorTaxLimit,
      maxBlockHeight,
    );

    // Convert to OperatorTaxCollectionTask format
    for (const tax of operatorTaxCollections) {
      tasks.push({
        type: 'operator-tax',
        id: tax.id,
        operatorId: tax.operator_id,
        domainId: tax.domain_id,
        address: '', // Not needed for tax collections
        amount: tax.amount,
        blockHeight: tax.block_height,
        extrinsicId: tax.extrinsic_id,
        eventId: tax.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed bundle submissions
    const bundleSubmissions = await services.fetchUnprocessedBundleSubmissions(
      bundleSubmissionsLimit,
      maxBlockHeight,
    );

    // Convert to BundleSubmissionTask format
    for (const bundle of bundleSubmissions) {
      tasks.push({
        type: 'bundle-submission',
        id: bundle.id,
        operatorId: bundle.operator_id,
        domainId: bundle.domain_id,
        address: bundle.proposer,
        proposer: bundle.proposer,
        bundleId: bundle.bundle_id,
        domainBlockNumber: bundle.domain_block_number,
        epoch: bundle.epoch,
        consensusBlockNumber: bundle.consensus_block_number,
        extrinsicId: bundle.extrinsic_id,
        eventId: bundle.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed operator deregistrations
    const operatorDeregistrations = await services.fetchUnprocessedOperatorDeregistrations(
      operatorDeregistrationsLimit,
      maxBlockHeight,
    );

    // Convert to OperatorDeregistrationTask format
    for (const deregistration of operatorDeregistrations) {
      tasks.push({
        type: 'operator-deregistration',
        id: deregistration.id,
        operatorId: deregistration.id, // The deregistration ID is the operator ID
        domainId: deregistration.domain_id,
        address: deregistration.owner,
        owner: deregistration.owner,
        blockHeight: deregistration.block_height,
        extrinsicId: deregistration.extrinsic_id,
        eventId: deregistration.event_id,
        timestamp: new Date(),
      });
    }

    // Fetch unprocessed nominators unlocked events
    const nominatorsUnlockedEvents = await services.fetchUnprocessedNominatorsUnlockedEvents(
      nominatorsUnlockedLimit,
      maxBlockHeight,
    );

    // Convert to NominatorsUnlockedTask format
    for (const event of nominatorsUnlockedEvents) {
      tasks.push({
        type: 'nominators-unlocked',
        id: event.id,
        operatorId: event.operator_id,
        domainId: event.domain_id,
        address: event.address,
        blockHeight: event.block_height,
        extrinsicId: event.extrinsic_id,
        eventId: event.event_id,
        timestamp: new Date(),
      });
    }

    if (tasks.length > 0) {
      console.log(`Fetched ${tasks.length} tasks 
        (${deposits.length} deposits,
        ${withdrawals.length} withdrawals,
        ${unlocks.length} unlocks, 
        ${operatorRegistrations.length} registrations, 
        ${operatorRewards.length} rewards, 
        ${operatorTaxCollections.length} tax collections, 
        ${bundleSubmissions.length} bundles, 
        ${operatorDeregistrations.length} deregistrations, 
        ${nominatorsUnlockedEvents.length} nominators unlocked)`);
    }
  } catch (error) {
    console.error('Error fetching staking tasks from database:', error);
    throw error;
  }

  return tasks;
};
