import { PoolClient } from 'pg';
import { OperatorUpdates } from '../../../interfaces';
import { query } from '../connection';

/**
 * Get share price for a specific epoch
 */
export const getEpochSharePrice = async (
  operatorId: string,
  domainId: string,
  epochIndex: string,
  client?: PoolClient,
): Promise<string | null> => {
  const queryText = `
    SELECT share_price 
    FROM staking.operator_epoch_share_prices 
    WHERE operator_id = $1 
      AND domain_id = $2 
      AND epoch_index = $3
    LIMIT 1
  `;

  const result = client
    ? await client.query(queryText, [operatorId, domainId, epochIndex])
    : await query(queryText, [operatorId, domainId, epochIndex]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].share_price;
};

export const upsertOperator = async (
  updates: OperatorUpdates,
  client?: PoolClient,
): Promise<void> => {
  const {
    operatorId,
    registration,
    totalRewardsToAdd,
    totalTaxToAdd,
    bundleCountToAdd,
    deregistered,
    unlockAtConfirmedDomainBlockNumber,
    deregistrationDomainEpoch,
  } = updates;

  // If this is a registration, try to insert first
  if (registration) {
    const insertQuery = `
      INSERT INTO staking.operators (
        id, address, domain_id, signing_key,
        minimum_nominator_stake, nomination_tax,
        total_tax_collected, total_rewards_collected,
        bundle_count, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 0, 0, 0, 'active', $7, $7)
      ON CONFLICT (id) DO NOTHING
    `;

    const insertParams = [
      operatorId,
      registration.owner,
      registration.domainId,
      registration.signingKey,
      registration.minimumNominatorStake,
      registration.nominationTax,
      Date.now(),
    ];

    if (client) {
      await client.query(insertQuery, insertParams);
    } else {
      await query(insertQuery, insertParams);
    }
  }

  // Build update query dynamically based on what needs updating
  const updateParts: string[] = [];
  const updateParams: any[] = [];
  let paramCount = 0;

  if (totalRewardsToAdd && totalRewardsToAdd !== '0') {
    updateParts.push(
      `total_rewards_collected = total_rewards_collected + $${++paramCount}::numeric`,
    );
    updateParams.push(totalRewardsToAdd);
  }

  if (totalTaxToAdd && totalTaxToAdd !== '0') {
    updateParts.push(`total_tax_collected = total_tax_collected + $${++paramCount}::numeric`);
    updateParams.push(totalTaxToAdd);
  }

  if (bundleCountToAdd && bundleCountToAdd > 0) {
    updateParts.push(`bundle_count = bundle_count + $${++paramCount}`);
    updateParams.push(bundleCountToAdd);
  }

  if (deregistered) {
    updateParts.push(`status = 'deregistered'`);
    if (unlockAtConfirmedDomainBlockNumber) {
      updateParts.push(`unlock_at_confirmed_domain_block_number = $${++paramCount}::numeric`);
      updateParams.push(unlockAtConfirmedDomainBlockNumber);
    }
    if (deregistrationDomainEpoch) {
      updateParts.push(`deregistration_domain_epoch = $${++paramCount}::numeric`);
      updateParams.push(deregistrationDomainEpoch);
    }
  }

  // Always update the updated_at timestamp
  updateParts.push(`updated_at = $${++paramCount}`);
  updateParams.push(Date.now());

  // Add operator ID for WHERE clause
  updateParams.push(operatorId);

  if (updateParts.length > 1) {
    // More than just updated_at
    const updateQuery = `
      UPDATE staking.operators 
      SET ${updateParts.join(', ')}
      WHERE id = $${++paramCount}
    `;

    if (client) {
      await client.query(updateQuery, updateParams);
    } else {
      await query(updateQuery, updateParams);
    }
  }
};

/**
 * Mark multiple operator events as processed in one query
 */
export const markOperatorEventsAsProcessed = async (
  eventsByType: {
    registrationIds?: string[];
    rewardIds?: string[];
    taxCollectionIds?: string[];
    bundleSubmissionIds?: string[];
    deregistrationIds?: string[];
  },
  client?: PoolClient,
): Promise<void> => {
  const queries: Array<{ text: string; values: any[] }> = [];

  if (eventsByType.registrationIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_registrations SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.registrationIds],
    });
  }

  if (eventsByType.rewardIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_rewards SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.rewardIds],
    });
  }

  if (eventsByType.taxCollectionIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_tax_collections SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.taxCollectionIds],
    });
  }

  if (eventsByType.bundleSubmissionIds?.length) {
    queries.push({
      text: `UPDATE staking.bundle_submissions SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.bundleSubmissionIds],
    });
  }

  if (eventsByType.deregistrationIds?.length) {
    queries.push({
      text: `UPDATE staking.operator_deregistrations SET processed = true WHERE id = ANY($1)`,
      values: [eventsByType.deregistrationIds],
    });
  }

  // Execute all queries
  for (const queryDef of queries) {
    if (client) {
      await client.query(queryDef.text, queryDef.values);
    } else {
      await query(queryDef.text, queryDef.values);
    }
  }
};
