import { query } from '../connection';

/**
 * Fetch unprocessed operator registrations from the database that are finalized
 */
export const fetchUnprocessedOperatorRegistrations = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
