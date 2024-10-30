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
        INSERT INTO consensus_sections (id)
        SELECT DISTINCT section 
        FROM (
          SELECT section FROM extrinsics WHERE block_number <= $1
          UNION
          SELECT section FROM events WHERE block_number <= $1
        ) combined_sections
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique extrinsic modules
      const extrinsicModuleQuery = `
        INSERT INTO consensus_extrinsic_module (id, section, method)
        SELECT DISTINCT 
          LOWER(name) as id,
          section,
          name as method
        FROM extrinsics 
        WHERE block_number <= $1
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique event modules
      const eventModuleQuery = `
        INSERT INTO consensus_event_module (id, section, method)
        SELECT DISTINCT 
          LOWER(name) as id,
          section,
          name as method
        FROM events 
        WHERE block_number <= $1
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Get unique log kinds
      const logQuery = `
        INSERT INTO consensus_log_kinds (id)
        SELECT DISTINCT kind 
        FROM logs 
        WHERE block_number <= $1
        ON CONFLICT (id) DO NOTHING
        RETURNING *`;

      // Update or insert accounts
      const accountsQuery = `
        INSERT INTO consensus_accounts (id, nonce, free, reserved, total, createdAt, updatedAt)
        SELECT DISTINCT ON (id) 
          id,
          nonce,
          free,
          reserved,
          total,
          created_at
        FROM accounts_history
        WHERE created_at <= $1
        ON CONFLICT (id) 
        DO UPDATE SET
          nonce = EXCLUDED.nonce,
          free = EXCLUDED.free,
          free_balance = EXCLUDED.free_balance,
          reserved = EXCLUDED.reserved,
          total = EXCLUDED.total,
          created_at = EXCLUDED.created_at
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
