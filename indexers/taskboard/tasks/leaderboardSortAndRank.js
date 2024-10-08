const { connectToDB, queries, entryTypeToTable } = require("../utils/db");
const { LEADERBOARD_ENTRY_TYPE } = require("../constants");

async function leaderboardSortAndRank(job) {
  const { blockNumber } = job.data;
  const pool = await connectToDB();

  const result = {
    blockNumber,
    updatedTables: [],
    query: [],
  };

  try {
    const client = await pool.connect();
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
      throw new Error("Failed to update rankings: " + err);
    } finally {
      client.release();
    }

    return result;
  } catch (err) {
    console.error("Error in leaderboardSortAndRank:", err);
    throw new Error("Failed to sort and rank leaderboard: " + err);
  }
}

module.exports = {
  leaderboardSortAndRank,
};
