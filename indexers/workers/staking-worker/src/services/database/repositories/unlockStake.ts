import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Fetch unprocessed unlock events from the database that are finalized
 */
export const fetchUnprocessedUnlocks = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
 * Mark an unlock event as processed
 */
export const markUnlockAsProcessed = async (
  eventId: string,
  client?: PoolClient,
): Promise<void> => {
  const queryText = 'UPDATE staking.unlocked_events SET processed = true WHERE event_id = $1';

  if (client) {
    await client.query(queryText, [eventId]);
  } else {
    await query(queryText, [eventId]);
  }
};

/**
 * Update nominator after successful unlock claim
 */
export const updateNominatorAfterUnlock = async (
  nominatorId: string,
  claimedAmount: string,
  storageFeeRefund: string,
  client?: PoolClient,
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
    nominatorId, // $1 - id
    address, // $2 - address
    domainId, // $3 - domain_id
    operatorId, // $4 - operator_id
    claimedAmount, // $5 - claimed amount to add
    storageFeeRefund, // $6 - storage fee to add
    Date.now(), // $7 - created_at, updated_at
  ];

  if (client) {
    await client.query(queryText, params);
  } else {
    await query(queryText, params);
  }
};
