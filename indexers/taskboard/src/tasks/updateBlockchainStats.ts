import { Pool, PoolClient } from "pg";
import { connectToDB, generateStatsQuery, STATS_TABLES } from "../utils/db";

interface UpdatedTable {
  table: string;
  rowCount: number;
}

interface StatsResult {
  updatedTables: UpdatedTable[];
  query: string[];
}

export const updateBlockchainStats = async (): Promise<StatsResult> => {
  const pool: Pool = await connectToDB();

  const result: StatsResult = {
    updatedTables: [],
    query: [],
  };

  try {
    const client: PoolClient = await pool.connect();
    try {
      // Set temp_buffers for this session
      await client.query("SET temp_buffers = '2GB'");
      // Set work_mem for this session
      await client.query("SET work_mem = '256MB'");

      await client.query("BEGIN");

      const updateQueries = STATS_TABLES.map((timeFrame) => {
        const query = generateStatsQuery(timeFrame);
        return client.query(query).then((queryResult) => {
          result.query.push(query);
          return {
            table: `stats.${timeFrame}`,
            rowCount: queryResult.rowCount,
          };
        });
      });

      const updatedTables = await Promise.all(updateQueries);
      result.updatedTables.push(...updatedTables);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error updating blockchain stats:", err);
      throw new Error(`Failed to update blockchain stats: ${err}`);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error("Error in updateBlockchainStats:", err);
    throw new Error(`Failed to update blockchain stats: ${err}`);
  }
};
