import { Pool, PoolClient } from "pg";
import { LEADERBOARD_ENTRY_TYPE } from "../constants";
import { connectToDB, entryTypeToTable, queries } from "../utils/db";

interface Job {
  data: {
    blockNumber: number;
  };
}

interface UpdatedTable {
  table: string;
  rowCount: number;
}

interface LeaderboardResult {
  blockNumber: number;
  updatedTables: UpdatedTable[];
  query: string[];
}

export const leaderboardSortAndRank = async (
  job: Job
): Promise<LeaderboardResult> => {
  const { blockNumber } = job.data;
  const pool: Pool = await connectToDB();

  const result: LeaderboardResult = {
    blockNumber,
    updatedTables: [],
    query: [],
  };

  try {
    const client: PoolClient = await pool.connect();
    try {
      await client.query("BEGIN");

      const updateQueries = Object.keys(LEADERBOARD_ENTRY_TYPE).map((key) => {
        const sourceTable = entryTypeToTable(
          LEADERBOARD_ENTRY_TYPE[key] + "Historie"
        );
        const targetTable = entryTypeToTable(LEADERBOARD_ENTRY_TYPE[key]);
        const rankingQuery = queries.updateLeaderboardRanking(
          sourceTable,
          targetTable
        );
        return client.query(rankingQuery).then((queryResult) => {
          result.query.push(rankingQuery);
          return {
            table: targetTable,
            rowCount: queryResult.rowCount,
          };
        });
      });

      const updatedTables = await Promise.all(updateQueries);
      result.updatedTables.push(...updatedTables);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error updating rankings:", err);
      throw new Error(`Failed to update rankings: ${err}`);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error("Error in leaderboardSortAndRank:", err);
    throw new Error(`Failed to sort and rank leaderboard: ${err}`);
  }
};
