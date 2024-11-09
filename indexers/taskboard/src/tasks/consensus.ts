import { Job } from "bull";
import { Pool, PoolClient } from "pg";
import { connectToDB, queries } from "../utils/db";

interface ConsensusResult {
  blockNumber: number;
  updatedTables: string[];
  query: string[];
}

interface JobData {
  blockNumber: number;
}

async function consensusUniqueRowsMapping(
  job: Job<JobData>
): Promise<ConsensusResult> {
  const { blockNumber } = job.data;
  const pool: Pool = await connectToDB();

  const result: ConsensusResult = {
    blockNumber,
    updatedTables: [],
    query: [],
  };

  try {
    const client: PoolClient = await pool.connect();

    // To-Do: Implement the logic to update the consensus tables
    // Tables:
    // - consensus_account_profiles
    // - consensus_account_rewards

    // Logic:
    // - For new accounts, create a new row in the consensus_account_profile and consensus_account_rewards
    // - For each rewards row, increment the total rewards value and counts for the corresponding account and reward type

    // Remaining:
    // - Should this be a cron tasks that pickup all the last rows (from the last block handled in redis) and process them in one go? instead of a single block?

    try {
      await client.query("BEGIN");

      // Execute queries
      const [
        sectionsResult,
        extrinsicModuleResult,
        eventModuleResult,
        logResult,
        accountResult,
      ] = await Promise.all([
        client.query(queries.consensusSectionsQuery, [blockNumber]),
        client.query(queries.consensusExtrinsicModulesQuery, [blockNumber]),
        client.query(queries.consensusEventModulesQuery, [blockNumber]),
        client.query(queries.consensusLogKindsQuery, [blockNumber]),
        client.query(queries.consensusAccountsQuery, [blockNumber]),
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
      throw new Error(`Failed to update consensus tables: ${err}`);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error("Error in consensus:", err);
    throw new Error(`Failed to update consensus tables: ${err}`);
  }
}

export { ConsensusResult, consensusUniqueRowsMapping, JobData };
