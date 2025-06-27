import { PoolClient } from 'pg';
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
  
  // Calculate batch size for each type (split evenly between 3 types)
  const unlocksLimit = Math.floor(batchSize / 3);
  const depositsLimit = Math.floor(batchSize / 3);
  const withdrawalsLimit = batchSize - depositsLimit - unlocksLimit;
  
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
    
    if (tasks.length > 0) {
      console.log(`Fetched ${tasks.length} tasks (${deposits.length} deposits, ${withdrawals.length} withdrawals, ${unlocks.length} unlocks)`);
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
 * Get nominator unlock blocks
 */
export const getNominatorUnlockBlocks = async (
  nominatorId: string,
  client?: PoolClient
): Promise<any[]> => {
  const queryText = 'SELECT unlock_at_confirmed_domain_block_number FROM staking.nominators WHERE id = $1';
  
  const result = client 
    ? await client.query(queryText, [nominatorId])
    : await query(queryText, [nominatorId]);
  
  if (result.rows.length > 0 && result.rows[0].unlock_at_confirmed_domain_block_number) {
    return result.rows[0].unlock_at_confirmed_domain_block_number;
  }
  
  return [];
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