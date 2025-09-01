import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Fetch unprocessed operator deregistrations from the database that are finalized
 */
export const fetchUnprocessedOperatorDeregistrations = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
 * Get operator deregistration info
 */
export const getOperatorDeregistrationInfo = async (
  operatorId: string,
  client?: PoolClient,
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
    deregistrationEpoch: result.rows[0].deregistration_domain_epoch,
  };
};

/**
 * Update nominator when they unlock after operator deregistration
 */
export const updateNominatorForOperatorDeregistration = async (
  nominatorId: string,
  unlockBlock: string,
  amount: string,
  storageFeeRefund: string,
  remainingShares: string,
  client?: PoolClient,
): Promise<void> => {
  // Build the new unlock entry
  const newUnlockEntry = {
    block: unlockBlock,
    amount: amount,
    storageFeeRefund: storageFeeRefund,
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
      withdrawn_shares = withdrawn_shares + $2,
      status = 'inactive',
      updated_at = $3
    WHERE id = $4
  `;

  const params = [JSON.stringify(newUnlockEntry), remainingShares, Date.now(), nominatorId];

  if (client) {
    await client.query(updateQuery, params);
  } else {
    await query(updateQuery, params);
  }
};
