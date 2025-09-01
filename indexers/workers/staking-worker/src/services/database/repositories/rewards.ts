import { query } from '../connection';

/**
 * Fetch unprocessed operator rewards from the database that are finalized
 */
export const fetchUnprocessedOperatorRewards = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
