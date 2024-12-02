import { Pool, PoolClient } from "pg";
import { connectToDB, queries } from "../utils/db";
import { getStoredValue, setRedisValue } from "../utils/store";

interface ConsensusResult {
  blockNumber: [number, number];
  updatedTables: string[];
  query: string[];
}

const LAST_BLOCK_NUMBER_KEY = "consensusUniqueRowsMapping:lastBlockNumber";
const BLOCK_NUMBER_INCREMENT = 12; // 12 is the number of blocks to process at a time
const BLOCK_NUMBER_RE_ORG_POSSIBILITY = 10;

export const consensusUniqueRowsMapping =
  async (): Promise<ConsensusResult> => {
    const pool: Pool = await connectToDB();

    const result: ConsensusResult = {
      blockNumber: [0, 0],
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

      // Get the last block number
      const lastBlockNumber = await getStoredValue(LAST_BLOCK_NUMBER_KEY).then(
        (reply) => (reply ? parseInt(reply) : 0)
      );
      const startBlockNumber =
        lastBlockNumber > BLOCK_NUMBER_RE_ORG_POSSIBILITY
          ? lastBlockNumber - BLOCK_NUMBER_RE_ORG_POSSIBILITY
          : 0;

      const endBlockNumber = lastBlockNumber + BLOCK_NUMBER_INCREMENT;
      result.blockNumber = [startBlockNumber, endBlockNumber];

      try {
        // Set temp_buffers for this session
        await client.query("SET temp_buffers = '2GB'");
        // Set work_mem for this session
        await client.query("SET work_mem = '256MB'");

        await client.query("BEGIN");

        // Execute queries sequentially to reduce load
        const sectionsResult = await client.query(
          queries.consensusSectionsQuery,
          [startBlockNumber, endBlockNumber]
        );
        if (sectionsResult.rows.length > 0)
          result.updatedTables.push("consensus_sections");

        const extrinsicModuleResult = await client.query(
          queries.consensusExtrinsicModulesQuery,
          [startBlockNumber, endBlockNumber]
        );
        if (extrinsicModuleResult.rows.length > 0)
          result.updatedTables.push("consensus_extrinsic_module");

        const eventModuleResult = await client.query(
          queries.consensusEventModulesQuery,
          [startBlockNumber, endBlockNumber]
        );
        if (eventModuleResult.rows.length > 0)
          result.updatedTables.push("consensus_event_module");

        const logResult = await client.query(queries.consensusLogKindsQuery, [
          startBlockNumber,
          endBlockNumber,
        ]);
        if (logResult.rows.length > 0)
          result.updatedTables.push("consensus_log_kinds");

        const accountResult = await client.query(
          queries.consensusAccountsQuery,
          [startBlockNumber, endBlockNumber]
        );
        if (accountResult.rows.length > 0)
          result.updatedTables.push("consensus_accounts");

        await client.query("COMMIT");

        // Update the last block number
        await setRedisValue(LAST_BLOCK_NUMBER_KEY, endBlockNumber.toString());
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
  };
