const {
  connectToDB,
  queries,
  entryTypeToTable,
  stringToUUID,
} = require("../utils/db");
const { LEADERBOARD_ENTRY_TYPE } = require("../constants");

async function leaderboardSortAndRank(job) {
  const { blockNumber, interval } = job.data;
  const blockNumberBigInt = BigInt(blockNumber);
  const intervalBigInt = BigInt(interval);

  const pool = await connectToDB();

  const lastBlockNumber =
    intervalBigInt > blockNumberBigInt
      ? BigInt(1)
      : blockNumberBigInt - intervalBigInt;

  const selectValues = [
    parseInt(lastBlockNumber.toString()),
    parseInt(blockNumberBigInt.toString()),
  ];

  try {
    const leaderboardEntries = await pool.query(
      queries.selectLeaderboardEntryByInterval,
      selectValues
    );

    if (leaderboardEntries.rowCount === 0) {
      console.log(
        "No leaderboard entries found for interval: " +
          lastBlockNumber +
          " - " +
          blockNumber
      );
      throw new Error(
        "No leaderboard entries found for interval: " +
          lastBlockNumber +
          " - " +
          blockNumber
      );
      return {
        query: leaderboardEntries.query,
        leaderboardEntries: leaderboardEntries.rowCount,
      };
    }

    const filteredEntries = {};
    Object.keys(LEADERBOARD_ENTRY_TYPE).forEach((key) => {
      const entries = leaderboardEntries.rows.filter(
        (r) => r.leaderboard === LEADERBOARD_ENTRY_TYPE[key]
      );
      if (entries.length > 0) {
        filteredEntries[key] = entries;
      }
    });

    const aggregatedEntries = {};
    Object.keys(filteredEntries).forEach((key) => {
      const entries = filteredEntries[key];
      aggregatedEntries[key] = {};
      entries.forEach((entry) => {
        const owner = entry.owner;
        if (!aggregatedEntries[key][owner]) {
          aggregatedEntries[key][owner] = {
            owner: owner,
            value: BigInt(0),
            created_at: entry.created_at,
            timestamp: entry.timestamp,
          };
        }
        aggregatedEntries[key][owner].value += BigInt(entry.value);
        if (entry.created_at > aggregatedEntries[key][owner].created_at) {
          aggregatedEntries[key][owner].created_at = entry.created_at;
        }
      });
    });

    for (const key in aggregatedEntries) {
      const table = entryTypeToTable(LEADERBOARD_ENTRY_TYPE[key]);
      const createOrUpdateQuery = queries.createOrUpdateLeaderboardEntry(table);

      for (const owner in aggregatedEntries[key]) {
        const entry = aggregatedEntries[key][owner];
        const id = stringToUUID(owner);
        const blockRange = `[${entry.created_at.toString()}, ${entry.created_at.toString()}]`;
        const values = [
          owner,
          entry.value.toString(),
          entry.timestamp,
          entry.created_at,
          id,
          blockRange,
        ];

        try {
          await pool.query(createOrUpdateQuery, values);
        } catch (err) {
          console.error(`Error updating leaderboard for ${owner}:`, err);
          throw new Error(
            "Failed to update leaderboard entry for " +
              owner +
              " on table " +
              table +
              ": " +
              err
          );
        }
      }

      const rankingQuery = queries.updateLeaderboardRanking(table);
      try {
        await pool.query(rankingQuery);
      } catch (err) {
        console.error(`Error updating ranking for ${table}:`, err);
        throw new Error(
          "Failed to update ranking for table " + table + ": " + err
        );
      }
    }

    /* const updateAccountsByAccountId = await pool.query(
      queries.updateAccountsByAccountId,
      updateValues
    ); */

    return {
      query: leaderboardEntries.query,
      leaderboardEntries: leaderboardEntries.rowCount,
    };
  } catch (err) {
    console.error("Error in leaderboardSortAndRank:", err);
    throw new Error("Failed to sort and rank leaderboard: " + err);
  }
}

module.exports = {
  leaderboardSortAndRank,
};
