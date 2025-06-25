import { PoolClient } from 'pg';
import { getDbClient, query } from './connection';

/**
 * Fetch unprocessed deposit tasks from the database
 */
export const fetchUnprocessedDeposits = async (limit: number): Promise<any[]> => {
  const result = await query(`
    SELECT 
      id, address, operator_id, domain_id,
      known_shares, known_storage_fee_deposit,
      pending_amount, pending_storage_fee_deposit,
      pending_effective_domain_epoch, timestamp
    FROM staking.nominator_deposits
    WHERE processed = false AND pending_amount > 0
    LIMIT $1
  `, [limit]);
  
  return result.rows;
};

/**
 * Fetch unprocessed withdrawal tasks from the database
 */
export const fetchUnprocessedWithdrawals = async (limit: number): Promise<any[]> => {
  const result = await query(`
    SELECT 
      id, address, operator_id, domain_id,
      withdrawal_in_shares_amount, withdrawal_in_shares_storage_fee_refund,
      withdrawal_in_shares_domain_epoch, withdrawal_in_shares_unlock_block,
      total_withdrawal_amount, total_storage_fee_withdrawal,
      withdrawals_json, timestamp
    FROM staking.nominator_withdrawals
    WHERE processed = false
    LIMIT $1
  `, [limit]);
  /*
  Sometimes we get duplicated withdrawals, so we need to deduplicate them later on when processing.
  */
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
 * Fetch staking tasks (deposits and withdrawals) that need processing
 */
export const fetchStakingTasks = async (batchSize: number): Promise<any[]> => {
  const tasks: any[] = [];
  
  // Calculate batch size for each type (split evenly)
  const depositsLimit = Math.floor(batchSize / 2);
  const withdrawalsLimit = batchSize - depositsLimit;
  
  try {
    // Fetch unprocessed deposits
    const deposits = await fetchUnprocessedDeposits(depositsLimit);
    
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
    const withdrawals = await fetchUnprocessedWithdrawals(withdrawalsLimit);
    
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
    
    if (tasks.length > 0) {
      console.log(`Fetched ${tasks.length} tasks (${withdrawals.length} withdrawals)`);
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
  totalDeposits: string,
  client?: PoolClient
): Promise<void> => {
  const queryText = `
    INSERT INTO staking.nominators (
      id, address, domain_id, operator_id,
      known_shares, known_storage_fee_deposit,
      total_deposits, total_deposits_count,
      total_withdrawals, total_withdrawals_count,
      total_storage_fee_refund,
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, 0, '[]'::jsonb, 'active', $9, $9)
    ON CONFLICT (id) DO UPDATE SET
      known_shares = $5,
      known_storage_fee_deposit = $6,
      total_deposits = $7,
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
    totalDeposits,                            // $7 - total_deposits
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
 * Calculate total deposits from all processed deposits for a nominator
 */
export const calculateProcessedDepositsTotal = async (
  address: string,
  domainId: string,
  operatorId: string,
  client?: PoolClient
): Promise<string> => {
  const queryText = `
    SELECT COALESCE(SUM(pending_amount + pending_storage_fee_deposit), 0) as total
    FROM staking.nominator_deposits
    WHERE address = $1 AND domain_id = $2 AND operator_id = $3
    AND processed = true
  `;
  
  const result = client 
    ? await client.query(queryText, [address, domainId, operatorId])
    : await query(queryText, [address, domainId, operatorId]);
  
  return result.rows[0].total;
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
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, 0, 0, 0, 0, $5, 1, $6, $7::jsonb, 'active', $8, $8)
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