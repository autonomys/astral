const { Pool } = require("pg");

const connectToDB = async (
  database = process.env.DB_GEMINI_3H || "gemini_3h"
) => {
  const dbConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database,
    password: process.env.DB_PASSWORD || "postgres",
    port: process.env.DB_PORT || 5432,
  };

  const pool = new Pool(dbConfig);

  return pool;
};

const entryTypeToTable = (entryType) =>
  entryType
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "") + "s";

const updateLeaderboardRanking = (table) => `
WITH ranked_entries AS (
  SELECT id, 
         RANK() OVER (ORDER BY value DESC) AS new_rank
  FROM leaderboard.${table}
)
UPDATE leaderboard.${table} t
SET rank = r.new_rank
FROM ranked_entries r
WHERE t.id = r.id;
`;

const queries = {
  updateLeaderboardRanking,
};

module.exports = { connectToDB, entryTypeToTable, queries };
