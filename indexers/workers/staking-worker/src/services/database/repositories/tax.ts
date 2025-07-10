import { query } from '../connection';

/**
 * Fetch unprocessed operator tax collections from the database that are finalized
 */
export const fetchUnprocessedOperatorTaxCollections = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
