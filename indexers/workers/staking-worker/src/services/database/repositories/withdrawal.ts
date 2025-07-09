import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Fetch unprocessed withdrawal tasks from the database that are finalized
 */
export const fetchUnprocessedWithdrawals = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
 * Update nominator after withdrawal conversion
 */
export const updateNominatorAfterWithdrawal = async (
  nominatorId: string,
  convertedAmount: string,
  storageFeeRefund: string,
  unlockBlocks: any[],
  client?: PoolClient,
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
    convertedAmount, // $1 - amount to add to total_withdrawals
    storageFeeRefund, // $2 - amount to add to total_storage_fee_refund
    JSON.stringify(unlockBlocks), // $3 - unlock_at_confirmed_domain_block_number (JSONB array)
    Date.now(), // $4 - updated_at
    nominatorId, // $5 - id (WHERE clause)
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
  withdrawnShares: string,
  client?: PoolClient,
): Promise<void> => {
  const queryText = `
    INSERT INTO staking.nominators (
      id, address, domain_id, operator_id,
      known_shares, withdrawn_shares, known_storage_fee_deposit,
      total_deposits, total_deposits_count,
      total_withdrawals, total_withdrawals_count,
      total_storage_fee_refund,
      total_claimed_amount, total_claimed_storage_fee,
      unlock_at_confirmed_domain_block_number,
      status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, 0, $5, 0, 0, 0, $6, 1, $7, 0, 0, $8::jsonb, 'active', $9, $9)
    ON CONFLICT (id) DO UPDATE SET
      total_withdrawals = $6,
      total_withdrawals_count = nominators.total_withdrawals_count + 1,
      total_storage_fee_refund = $7,
      withdrawn_shares = nominators.withdrawn_shares + $5,
      unlock_at_confirmed_domain_block_number = $8::jsonb,
      updated_at = $9
  `;

  const params = [
    nominatorId, // $1 - id
    address, // $2 - address
    domainId, // $3 - domain_id
    operatorId, // $4 - operator_id
    withdrawnShares, // $5 - withdrawn_shares
    totalWithdrawals, // $6 - total_withdrawals
    storageFeeRefund, // $7 - total_storage_fee_refund
    JSON.stringify(unlockBlocks), // $8 - unlock_at_confirmed_domain_block_number
    Date.now(), // $9 - created_at, updated_at
  ];

  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};
