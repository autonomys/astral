import { PoolClient } from 'pg';
import { OperatorUpdates } from '../../interfaces';
import { getDbClient, query } from './connection';

/**
 * Fetch unprocessed deposit tasks from the database that are finalized
 */
export const fetchUnprocessedDeposits = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, address, operator_id, domain_id,
      known_shares, known_storage_fee_deposit,
      pending_amount, pending_storage_fee_deposit,
      pending_effective_domain_epoch, timestamp, block_height
    FROM staking.nominator_deposits
    WHERE processed = false AND pending_amount > 0
  `;
  
  const params: any[] = [];
  
  // Only fetch events below the finality threshold
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed withdrawal tasks from the database that are finalized
 */
export const fetchUnprocessedWithdrawals = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, address, operator_id, domain_id,
      withdrawal_in_shares_amount, withdrawal_in_shares_storage_fee_refund,
      withdrawal_in_shares_domain_epoch, withdrawal_in_shares_unlock_block,
      total_withdrawal_amount, total_storage_fee_withdrawal,
      withdrawals_json, timestamp, block_height
    FROM staking.nominator_withdrawals
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  // Only fetch events below the finality threshold
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  /*
  Sometimes we get duplicated withdrawals, so we need to deduplicate them later on when processing.
  */
  return result.rows;
};

/**
 * Fetch unprocessed nominators unlocked events from the database that are finalized
 */
export const fetchUnprocessedNominatorsUnlockedEvents = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, domain_id, operator_id, address,
      block_height, extrinsic_id, event_id
    FROM staking.nominators_unlocked_events
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  // Only fetch events below the finality threshold
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed unlock events from the database that are finalized
 */
export const fetchUnprocessedUnlocks = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, address, operator_id, domain_id, nominator_id,
      amount, storage_fee, block_height, event_id
    FROM staking.unlocked_events
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  // Only fetch events below the finality threshold
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed operator registrations from the database that are finalized
 */
export const fetchUnprocessedOperatorRegistrations = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, owner, domain_id, signing_key, minimum_nominator_stake,
      nomination_tax, block_height, extrinsic_id, event_id
    FROM staking.operator_registrations
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed operator rewards from the database that are finalized
 */
export const fetchUnprocessedOperatorRewards = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, domain_id, operator_id, amount, at_block_number,
      block_height, extrinsic_id, event_id
    FROM staking.operator_rewards
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed operator tax collections from the database that are finalized
 */
export const fetchUnprocessedOperatorTaxCollections = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, domain_id, operator_id, amount,
      block_height, extrinsic_id, event_id
    FROM staking.operator_tax_collections
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed bundle submissions from the database that are finalized
 */
export const fetchUnprocessedBundleSubmissions = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, proposer, bundle_id, domain_id, operator_id,
      domain_block_number, epoch, consensus_block_number,
      extrinsic_id, event_id
    FROM staking.bundle_submissions
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  if (maxBlockHeight !== undefined) {
    queryText += ` AND consensus_block_number <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY consensus_block_number ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY consensus_block_number ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Fetch unprocessed operator deregistrations from the database that are finalized
 */
export const fetchUnprocessedOperatorDeregistrations = async (limit: number, maxBlockHeight?: number): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, owner, domain_id, block_height, extrinsic_id, event_id
    FROM staking.operator_deregistrations
    WHERE processed = false
  `;
  
  const params: any[] = [];
  
  if (maxBlockHeight !== undefined) {
    queryText += ` AND block_height <= $1`;
    params.push(maxBlockHeight);
    queryText += ` ORDER BY block_height ASC LIMIT $2`;
    params.push(limit);
  } else {
    queryText += ` ORDER BY block_height ASC LIMIT $1`;
    params.push(limit);
  }
  
  const result = await query(queryText, params);
  return result.rows;
};

/**
 * Mark a deposit as processed
 */
export const markDepositAsProcessed = async (id: string, client?: PoolClient): Promise<void> => {
  const queryText = 'UPDATE staking.nominator_deposits SET processed = true WHERE id = $1';
  
  if (client) {
    await client.query(queryText, [id]);
  } else {
    await query(queryText, [id]);
  }
};

/**
 * Mark a withdrawal as processed
 */
export const markWithdrawalAsProcessed = async (id: string, client?: PoolClient): Promise<void> => {
  const queryText = 'UPDATE staking.nominator_withdrawals SET processed = true WHERE id = $1';
  
  if (client) {
    await client.query(queryText, [id]);
  } else {
    await query(queryText, [id]);
  }
};

/**
 * Mark an unlock event as processed
 */
export const markUnlockAsProcessed = async (eventId: string, client?: PoolClient): Promise<void> => {
  const queryText = 'UPDATE staking.unlocked_events SET processed = true WHERE event_id = $1';
  
  if (client) {
    await client.query(queryText, [eventId]);
  } else {
    await query(queryText, [eventId]);
  }
};



/**
 * Get share price for a specific epoch
 */
export const getEpochSharePrice = async (
  operatorId: string,
  domainId: string,
  epochIndex: string,
  client?: PoolClient
): Promise<string | null> => {
  const queryText = `
    SELECT share_price 
    FROM staking.operator_epoch_share_prices 
    WHERE operator_id = $1 
      AND domain_id = $2 
      AND epoch_index = $3
    LIMIT 1
  `;
  
  const result = client 
    ? await client.query(queryText, [operatorId, domainId, epochIndex])
    : await query(queryText, [operatorId, domainId, epochIndex]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0].share_price;
};

/**
 * Fetch staking tasks (deposits, withdrawals, and unlock events) that need processing
 */
export const fetchStakingTasks = async (batchSize: number, maxBlockHeight?: number): Promise<any[]> => {
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
  const nominatorsUnlockedLimit = batchSize - (baseLimit * 8); // Take any remainder
  
  try {
    // Fetch unprocessed deposits
    const deposits = await fetchUnprocessedDeposits(depositsLimit, maxBlockHeight);
    
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
        pendingEffectiveDomainEpoch: deposit.pending_effective_domain_epoch
      });
    }
    
    // Fetch unprocessed withdrawals
    const withdrawals = await fetchUnprocessedWithdrawals(withdrawalsLimit, maxBlockHeight);
    
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
        withdrawalsJson: withdrawal.withdrawals_json
      });
    }
    
    // Fetch unprocessed unlock events
    const unlocks = await fetchUnprocessedUnlocks(unlocksLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed operator registrations
    const operatorRegistrations = await fetchUnprocessedOperatorRegistrations(operatorRegistrationsLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed operator rewards
    const operatorRewards = await fetchUnprocessedOperatorRewards(operatorRewardsLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed operator tax collections
    const operatorTaxCollections = await fetchUnprocessedOperatorTaxCollections(operatorTaxLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed bundle submissions
    const bundleSubmissions = await fetchUnprocessedBundleSubmissions(bundleSubmissionsLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed operator deregistrations
    const operatorDeregistrations = await fetchUnprocessedOperatorDeregistrations(operatorDeregistrationsLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    // Fetch unprocessed nominators unlocked events
    const nominatorsUnlockedEvents = await fetchUnprocessedNominatorsUnlockedEvents(nominatorsUnlockedLimit, maxBlockHeight);
    
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
        timestamp: new Date()
      });
    }
    
    if (tasks.length > 0) {
      console.log(`Fetched ${tasks.length} tasks (${deposits.length} deposits, ${withdrawals.length} withdrawals, ${unlocks.length} unlocks, ${operatorRegistrations.length} registrations, ${operatorRewards.length} rewards, ${operatorTaxCollections.length} tax collections, ${bundleSubmissions.length} bundles, ${operatorDeregistrations.length} deregistrations, ${nominatorsUnlockedEvents.length} nominators unlocked)`);
    }
  } catch (error) {
    console.error('Error fetching staking tasks from database:', error);
    throw error;
  }
  
  return tasks;
};

/**
 * Create or update nominator record after deposit conversion
 */
export const upsertNominatorAfterDeposit = async (
  nominatorId: string,
  address: string,
  domainId: string,
  operatorId: string,
  totalKnownShares: string,
  totalKnownStorageFeeDeposit: string,
  depositAmount: string,
  client?: PoolClient
): Promise<void> => {
  const queryText = `
    INSERT INTO staking.nominators (
      id, address, domain_id, operator_id,
      known_shares, known_storage_fee_deposit,
      total_deposits, total_deposits_count,
      total_withdrawals, total_withdrawals_count,
      total_storage_fee_refund,
      total_claimed_amount, total_claimed_storage_fee,
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7::numeric, $8, 0, 0, 0, 0, 0, '[]'::jsonb, 'active', $9, $9)
    ON CONFLICT (id) DO UPDATE SET
      known_shares = $5,
      known_storage_fee_deposit = $6,
      total_deposits = nominators.total_deposits + $7::numeric,
      total_deposits_count = nominators.total_deposits_count + 1,
      updated_at = $9
  `;
  
  const params = [
    nominatorId,                              // $1 - id
    address,                                  // $2 - address
    domainId,                                 // $3 - domain_id
    operatorId,                               // $4 - operator_id
    totalKnownShares,                         // $5 - known_shares
    totalKnownStorageFeeDeposit,              // $6 - known_storage_fee_deposit
    depositAmount,                            // $7 - deposit amount to add
    1,                                        // $8 - total_deposits_count (initial value)
    Date.now()                                // $9 - created_at, updated_at
  ];
  
  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};


/**
 * Update nominator after withdrawal conversion
 */
export const updateNominatorAfterWithdrawal = async (
  nominatorId: string,
  convertedAmount: string,
  storageFeeRefund: string,
  unlockBlocks: any[],
  client?: PoolClient
): Promise<void> => {
  const queryText = `
    UPDATE staking.nominators 
    SET 
      total_withdrawals = total_withdrawals + $1,
      total_storage_fee_refund = total_storage_fee_refund + $2,
      unlock_at_confirmed_domain_block_number = $3::jsonb,
      updated_at = $4
    WHERE id = $5
  `;
  
  const params = [
    convertedAmount,                          // $1 - amount to add to total_withdrawals
    storageFeeRefund,                         // $2 - amount to add to total_storage_fee_refund
    JSON.stringify(unlockBlocks),             // $3 - unlock_at_confirmed_domain_block_number (JSONB array)
    Date.now(),                               // $4 - updated_at
    nominatorId                               // $5 - id (WHERE clause)
  ];
  
  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};

/**
 * Create or update nominator record after withdrawal conversion
 */
export const upsertNominatorAfterWithdrawal = async (
  nominatorId: string,
  address: string,
  domainId: string,
  operatorId: string,
  totalWithdrawals: string,
  storageFeeRefund: string,
  unlockBlocks: any[],
  client?: PoolClient
): Promise<void> => {
  const queryText = `
    INSERT INTO staking.nominators (
      id, address, domain_id, operator_id,
      known_shares, known_storage_fee_deposit,
      total_deposits, total_deposits_count,
      total_withdrawals, total_withdrawals_count,
      total_storage_fee_refund,
      total_claimed_amount, total_claimed_storage_fee,
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, 0, 0, 0, 0, $5, 1, $6, 0, 0, $7::jsonb, 'active', $8, $8)
    ON CONFLICT (id) DO UPDATE SET
      total_withdrawals = $5,
      total_withdrawals_count = nominators.total_withdrawals_count + 1,
      total_storage_fee_refund = $6,
      unlock_at_confirmed_domain_block_number = $7::jsonb,
      updated_at = $8
  `;
  
  const params = [
    nominatorId,                              // $1 - id
    address,                                  // $2 - address
    domainId,                                 // $3 - domain_id
    operatorId,                               // $4 - operator_id
    totalWithdrawals,                         // $5 - total_withdrawals
    storageFeeRefund,                         // $6 - total_storage_fee_refund
    JSON.stringify(unlockBlocks),             // $7 - unlock_at_confirmed_domain_block_number
    Date.now()                                // $8 - created_at, updated_at
  ];
  
  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};

/**
 * Update nominator after successful unlock claim
 */
export const updateNominatorAfterUnlock = async (
  nominatorId: string,
  claimedAmount: string,
  storageFeeRefund: string,
  client?: PoolClient
): Promise<void> => {
  // Parse nominator ID to get address, domain_id, and operator_id
  const [address, domainId, operatorId] = nominatorId.split('-');
  
  const queryText = `
    INSERT INTO staking.nominators (
      id, address, domain_id, operator_id,
      known_shares, known_storage_fee_deposit,
      total_deposits, total_deposits_count,
      total_withdrawals, total_withdrawals_count,
      total_storage_fee_refund,
      total_claimed_amount, total_claimed_storage_fee,
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, 0, 0, 0, 0, 0, 0, 0, $5::numeric, $6::numeric, '[]'::jsonb, 'active', $7, $7)
    ON CONFLICT (id) DO UPDATE SET
      total_claimed_amount = nominators.total_claimed_amount + $5::numeric,
      total_claimed_storage_fee = nominators.total_claimed_storage_fee + $6::numeric,
      updated_at = $7
  `;
  
  const params = [
    nominatorId,                              // $1 - id
    address,                                  // $2 - address
    domainId,                                 // $3 - domain_id
    operatorId,                               // $4 - operator_id
    claimedAmount,                            // $5 - claimed amount to add
    storageFeeRefund,                         // $6 - storage fee to add
    Date.now()                                // $7 - created_at, updated_at
  ];
  
  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};
  

export const upsertOperator = async (
  updates: OperatorUpdates,
  client?: PoolClient
): Promise<void> => {
  const { operatorId, registration, totalRewardsToAdd, totalTaxToAdd, bundleCountToAdd, deregistered, unlockAtConfirmedDomainBlockNumber, deregistrationDomainEpoch } = updates;
  
  // If this is a registration, try to insert first
  if (registration) {
    const insertQuery = `
      INSERT INTO staking.operators (
        id, address, domain_id, signing_key,
        minimum_nominator_stake, nomination_tax,
        total_tax_collected, total_rewards_collected,
        bundle_count, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 0, 0, 0, 'active', $7, $7)
      ON CONFLICT (id) DO NOTHING
    `;
    
    const insertParams = [
      operatorId,
      registration.owner,
      registration.domainId,
      registration.signingKey,
      registration.minimumNominatorStake,
      registration.nominationTax,
      Date.now()
    ];
    
    if (client) {
      await client.query(insertQuery, insertParams);
    } else {
      await query(insertQuery, insertParams);
    }
  }
  
  // Build update query dynamically based on what needs updating
  const updateParts: string[] = [];
  const updateParams: any[] = [];
  let paramCount = 0;
  
  if (totalRewardsToAdd && totalRewardsToAdd !== '0') {
    updateParts.push(`total_rewards_collected = total_rewards_collected + $${++paramCount}::numeric`);
    updateParams.push(totalRewardsToAdd);
  }
  
  if (totalTaxToAdd && totalTaxToAdd !== '0') {
    updateParts.push(`total_tax_collected = total_tax_collected + $${++paramCount}::numeric`);
    updateParams.push(totalTaxToAdd);
  }
  
  if (bundleCountToAdd && bundleCountToAdd > 0) {
    updateParts.push(`bundle_count = bundle_count + $${++paramCount}`);
    updateParams.push(bundleCountToAdd);
  }
  
  if (deregistered) {
    updateParts.push(`status = 'deregistered'`);
    if (unlockAtConfirmedDomainBlockNumber) {
      updateParts.push(`unlock_at_confirmed_domain_block_number = $${++paramCount}::numeric`);
      updateParams.push(unlockAtConfirmedDomainBlockNumber);
    }
    if (deregistrationDomainEpoch) {
      updateParts.push(`deregistration_domain_epoch = $${++paramCount}::numeric`);
      updateParams.push(deregistrationDomainEpoch);
    }
  }
  
  // Always update the updated_at timestamp
  updateParts.push(`updated_at = $${++paramCount}`);
  updateParams.push(Date.now());
  
  // Add operator ID for WHERE clause
  updateParams.push(operatorId);
  
  if (updateParts.length > 1) { // More than just updated_at
    const updateQuery = `
      UPDATE staking.operators 
      SET ${updateParts.join(', ')}
      WHERE id = $${++paramCount}
    `;
    
    if (client) {
      await client.query(updateQuery, updateParams);
    } else {
      await query(updateQuery, updateParams);
    }
  }
};

/**
 * Mark nominators unlocked event as processed
 */
export const markNominatorsUnlockedEventAsProcessed = async (eventId: string, client?: PoolClient): Promise<void> => {
  const queryText = 'UPDATE staking.nominators_unlocked_events SET processed = true WHERE event_id = $1';
  
  if (client) {
    await client.query(queryText, [eventId]);
  } else {
    await query(queryText, [eventId]);
  }
};

/**
 * Get operator deregistration info
 */
export const getOperatorDeregistrationInfo = async (
  operatorId: string,
  client?: PoolClient
): Promise<{ unlockBlock: string | null; deregistrationEpoch: string | null } | null> => {
  const queryText = `
    SELECT unlock_at_confirmed_domain_block_number, deregistration_domain_epoch
    FROM staking.operators
    WHERE id = $1 AND status = 'deregistered'
  `;
  
  const result = client 
    ? await client.query(queryText, [operatorId])
    : await query(queryText, [operatorId]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return {
    unlockBlock: result.rows[0].unlock_at_confirmed_domain_block_number,
    deregistrationEpoch: result.rows[0].deregistration_domain_epoch
  };
};

/**
 * Get a specific nominator's data to process their unlock after operator deregistration
 * THIS IS NOT COMPLETE YET. THE known_shares and known_storage_fee_deposit values include the withdrew amount but not unlocked/claimed yet.
 */
export const fetchNominatorForUnlock = async (
  address: string,
  operatorId: string,
  domainId: string,
  client?: PoolClient
): Promise<any | null> => {
  const nominatorId = `${address}-${domainId}-${operatorId}`;
  const queryText = `
    SELECT 
      id, address, domain_id, operator_id,
      known_shares, known_storage_fee_deposit,
      unlock_at_confirmed_domain_block_number,
      status
    FROM staking.nominators
    WHERE id = $1
  `;
  
  const result = client
    ? await client.query(queryText, [nominatorId])
    : await query(queryText, [nominatorId]);
  
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Update nominator when they unlock after operator deregistration
 */
export const updateNominatorForOperatorDeregistration = async (
  nominatorId: string,
  unlockBlock: string,
  amount: string,
  storageFeeRefund: string,
  client?: PoolClient
): Promise<void> => {
  // Build the new unlock entry
  const newUnlockEntry = {
    block: unlockBlock,
    amount: amount,
    storageFeeRefund: storageFeeRefund
  };
  
  const updateQuery = `
    UPDATE staking.nominators
    SET 
      unlock_at_confirmed_domain_block_number = 
        CASE 
          WHEN jsonb_typeof(unlock_at_confirmed_domain_block_number) = 'array' 
          THEN unlock_at_confirmed_domain_block_number || $1::jsonb
          ELSE jsonb_build_array(unlock_at_confirmed_domain_block_number, $1::jsonb)
        END,
      status = 'inactive',
      updated_at = $2
    WHERE id = $3
  `;
  
  const params = [
    JSON.stringify(newUnlockEntry),
    Date.now(),
    nominatorId
  ];
  
  if (client) {
    await client.query(updateQuery, params);
  } else {
    await query(updateQuery, params);
  }
};

/**
 * Mark multiple operator events as processed in one query
 */
export const markOperatorEventsAsProcessed = async (
  eventsByType: {
    registrationIds?: string[];
    rewardIds?: string[];
    taxCollectionIds?: string[];
    bundleSubmissionIds?: string[];
    deregistrationIds?: string[];
  },
  client?: PoolClient
): Promise<void> => {
  const queries: Array<{ text: string; values: any[] }> = [];
  
  if (eventsByType.registrationIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_registrations SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.registrationIds]
    });
  }
  
  if (eventsByType.rewardIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_rewards SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.rewardIds]
    });
  }
  
  if (eventsByType.taxCollectionIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_tax_collections SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.taxCollectionIds]
    });
  }
  
  if (eventsByType.bundleSubmissionIds?.length) {
    queries.push({
      text: `UPDATE staking.bundle_submissions SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.bundleSubmissionIds]
    });
  }
  
  if (eventsByType.deregistrationIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_deregistrations SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.deregistrationIds]
    });
  }
  
  // Execute all queries
  for (const queryDef of queries) {
    if (client) {
      await client.query(queryDef.text, queryDef.values);
    } else {
      await query(queryDef.text, queryDef.values);
    }
  }
};

/**
 * Execute transaction with rollback on error
 */
export const withTransaction = async <T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const client = await getDbClient();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};