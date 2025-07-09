import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Fetch unprocessed nominators unlocked events from the database that are finalized
 */
export const fetchUnprocessedNominatorsUnlockedEvents = async (
  limit: number,
  maxBlockHeight?: number,
): Promise<any[]> => {
  let queryText = `
    SELECT 
      id, domain_id, operator_id, address,
      block_height, extrinsic_id, event_id
    FROM staking.nominators_unlocked_events
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
 * Mark nominators unlocked event as processed
 */
export const markNominatorsUnlockedEventAsProcessed = async (
  eventId: string,
  client?: PoolClient,
): Promise<void> => {
  const queryText =
    'UPDATE staking.nominators_unlocked_events SET processed = true WHERE event_id = $1';

  if (client) {
    await client.query(queryText, [eventId]);
  } else {
    await query(queryText, [eventId]);
  }
};
