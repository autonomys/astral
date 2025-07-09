import { Pool, PoolClient } from 'pg';
import { LEADERBOARD_ENTRY_TYPE } from '../constants';
import { connectToDB, entryTypeToTable, updateLeaderboardRanking } from '../utils/db';

interface UpdatedTable {
  table: string;
  rowCount: number;
}

interface LeaderboardResult {
  updatedTables: UpdatedTable[];
  query: string[];
}

export const leaderboardSortAndRank = async (): Promise<LeaderboardResult> => {
  const pool: Pool = await connectToDB();

  const result: LeaderboardResult = {
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

      await client.query('BEGIN');

      const updateQueries = Object.keys(LEADERBOARD_ENTRY_TYPE).map((key) => {
        const sourceTable = entryTypeToTable(LEADERBOARD_ENTRY_TYPE[key] + 'Historie');
        const targetTable = entryTypeToTable(LEADERBOARD_ENTRY_TYPE[key]);
        const rankingQuery = updateLeaderboardRanking(sourceTable, targetTable);
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

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error updating rankings:', err);
      throw new Error(`Failed to update rankings: ${err}`);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error('Error in leaderboardSortAndRank:', err);
    throw new Error(`Failed to sort and rank leaderboard: ${err}`);
  }
};
