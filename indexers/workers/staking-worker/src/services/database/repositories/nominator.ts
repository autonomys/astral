import { PoolClient } from 'pg';
import { query } from '../connection';

/**
 * Get a specific nominator's data to process their unlock after operator deregistration
 * THIS IS NOT COMPLETE YET. THE known_shares and known_storage_fee_deposit values include the withdrew amount but not unlocked/claimed yet.
 */
export const fetchNominatorForUnlock = async (
  address: string,
  operatorId: string,
  domainId: string,
  client?: PoolClient,
): Promise<any | null> => {
  const nominatorId = `${address}-${domainId}-${operatorId}`;
  const queryText = `
    SELECT 
      id, address, domain_id, operator_id,
      known_shares, withdrawn_shares, known_storage_fee_deposit,
      unlock_at_confirmed_domain_block_number,
      status
    FROM staking.nominators
    WHERE id = $1
  `;

  const result = client
    ? await client.query(queryText, [nominatorId])
    : await query(queryText, [nominatorId]);

  return result.rows.length > 0 ? result.rows[0] : null;
};
