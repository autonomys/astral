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

async function leaderboardSortAndRank(job: Job): Promise<LeaderboardResult> {
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
        const table = entryTypeToTable(LEADERBOARD_ENTRY_TYPE[key]);
        const rankingQuery = queries.updateLeaderboardRanking(table);
        return client.query(rankingQuery).then((queryResult) => {
          result.query.push(rankingQuery);
          return {
            table,
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
}

export { Job, LeaderboardResult, leaderboardSortAndRank, UpdatedTable };
