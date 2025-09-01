import { query } from '../connection';

/**
 * Fetch unprocessed bundle submissions from the database that are finalized
 */
export const fetchUnprocessedBundleSubmissions = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
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
