import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Fetch unprocessed deposit tasks from the database that are finalized
 */
export const fetchUnprocessedDeposits = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
    ) VALUES ($1, $2, $3, $4, $5, 0, $6, $7::numeric, $8, 0, 0, 0, 0, 0, '[]'::jsonb, 'active', $9, $9)
    ON CONFLICT (id) DO UPDATE SET
      known_shares = $5,
      known_storage_fee_deposit = $6,
      total_deposits = nominators.total_deposits + $7::numeric,
      total_deposits_count = nominators.total_deposits_count + 1,
      updated_at = $9
  `;

  const params = [
    nominatorId, // $1 - id
    address, // $2 - address
    domainId, // $3 - domain_id
    operatorId, // $4 - operator_id
    totalKnownShares, // $5 - known_shares
    totalKnownStorageFeeDeposit, // $6 - known_storage_fee_deposit
    depositAmount, // $7 - deposit amount to add
    1, // $8 - total_deposits_count (initial value)
    Date.now(), // $9 - created_at, updated_at
  ];

  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};
