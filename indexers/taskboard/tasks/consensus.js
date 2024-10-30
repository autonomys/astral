const { connectToDB, queries, entryTypeToTable } = require("../utils/db");
const { LEADERBOARD_ENTRY_TYPE } = require("../constants");

async function consensusUniqueRowsMapping(job) {
  const { blockNumber } = job.data;
  const pool = await connectToDB();

  const result = {
    blockNumber,
    updatedTables: [],
    query: [],
  };

  try {
    const client = await pool.connect();

    // To-Do: Implement the logic to update the consensus tables
    // Tables:
    // - consensus_sections
    // - consensus_extrinsic_module
    // - consensus_event_module
    // - consensus_log_kinds
    // - consensus_accounts
    // - consensus_account_profiles
    // - consensus_account_rewards

    // Logic:
    // - Get the last block handled from redis
    // - Get a batch of extrinsics, events, logs, rewards and accounts history rows from the database
    // - For each extrinsics, record if not existing the extrinsic module and section
    // - For each events, record if not existing the event module
    // - For each logs, record if not existing the log kind
    // - For each accounts history rows, record if not existing the account or update the row with the new total, free and reserved balance
    // - For new accounts, create a new row in the consensus_account_profile and consensus_account_rewards
    // - For each rewards row, increment the total rewards value and counts for the corresponding account and reward type
    // - Ideally, wrap all the above in a atomic transaction
    // - Update the last block handled in redis

    try {
      await client.query("BEGIN");

      // Get unique sections from both extrinsics and events
      const sectionsQuery = `
        INSERT INTO consensus.sections (id, _id, _block_range)
        SELECT DISTINCT section as id, 
          gen_random_uuid() as _id,
          int8range($1::int8, $1::int8) as _block_range
        FROM (
          SELECT section FROM consensus.extrinsics WHERE _block_range @> $1::int8
          UNION
          SELECT section FROM consensus.events WHERE _block_range @> $1::int8
        ) combined_sections
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique extrinsic modules
      const extrinsicModuleQuery = `
        INSERT INTO consensus.extrinsic_modules (id, _id, section, method, _block_range)
        SELECT DISTINCT 
          LOWER(name) as id,
          gen_random_uuid() as _id,
          section,
          module as method,
          int8range($1::int8, $1::int8) as _block_range
        FROM consensus.extrinsics 
        WHERE _block_range @> $1::int8
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique event modules
      const eventModuleQuery = `
        INSERT INTO consensus.event_modules (id, _id, section, method, _block_range)
        SELECT DISTINCT 
          LOWER(name) as id,
          gen_random_uuid() as _id,
          section,
          module as method,
          int8range($1::int8, $1::int8) as _block_range
        FROM consensus.events 
        WHERE _block_range @> $1::int8
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique log kinds
      const logQuery = `
        INSERT INTO consensus.log_kinds (id, _id, _block_range)
        SELECT DISTINCT kind as id, 
          gen_random_uuid() as _id,
          int8range($1::int8, $1::int8) as _block_range
        FROM consensus.logs 
        WHERE _block_range @> $1::int8
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Update or insert accounts
      const accountsQuery = `
        INSERT INTO consensus.accounts (id, _id, nonce, free, reserved, total, created_at, updated_at, _block_range)
        SELECT DISTINCT ON (id) 
          id,
          gen_random_uuid() as _id,
          nonce,
          free,
          reserved,
          total,
          created_at,
          updated_at,
          int8range($1::int8, $1::int8) as _block_range
        FROM consensus.account_histories
        WHERE _block_range @> $1::int8
        ON CONFLICT (id) 
        DO UPDATE SET
          nonce = EXCLUDED.nonce,
          free = EXCLUDED.free,
          reserved = EXCLUDED.reserved,
          total = EXCLUDED.total,
          created_at = EXCLUDED.created_at,
          updated_at = EXCLUDED.updated_at
        RETURNING *`;

      // Execute queries
      const [
        sectionsResult,
        extrinsicModuleResult,
        eventModuleResult,
        logResult,
        accountResult,
      ] = await Promise.all([
        client.query(sectionsQuery, [blockNumber]),
        client.query(extrinsicModuleQuery, [blockNumber]),
        client.query(eventModuleQuery, [blockNumber]),
        client.query(logQuery, [blockNumber]),
        client.query(accountsQuery, [blockNumber]),
      ]);

      // Track updated tables
      if (sectionsResult.rows.length > 0)
        result.updatedTables.push("consensus_sections");
      if (extrinsicModuleResult.rows.length > 0)
        result.updatedTables.push("consensus_extrinsic_module");
      if (eventModuleResult.rows.length > 0)
        result.updatedTables.push("consensus_event_module");
      if (logResult.rows.length > 0)
        result.updatedTables.push("consensus_log_kinds");
      if (accountResult.rows.length > 0)
        result.updatedTables.push("consensus_accounts");

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error updating consensus tables:", err);
      throw new Error("Failed to update consensus tables: " + err);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error("Error in consensus:", err);
    throw new Error("Failed to update consensus tables: " + err);
  }
}

module.exports = {
  consensusUniqueRowsMapping,
};
