const { Pool } = require("pg");
const { createHash } = require("crypto");

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

const stringToUUID = (input) => {
  const hash = createHash("sha256").update(input).digest("hex");
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32),
  ].join("-");
};

const selectAccountsByAccountId = `SELECT * FROM accounts.accounts WHERE account_id = $1`;

const updateAccountsByAccountId = `
UPDATE accounts.accounts
SET free = $1, reserved = $2, updated_at = $3
WHERE account_id = $4
`;

const selectLeaderboardEntryByInterval = `
SELECT * FROM leaderboard.leaderboard_entries 
WHERE accounted_for = false AND created_at > $1 AND created_at <= $2 
ORDER BY created_at ASC`;

const createOrUpdateLeaderboardEntry = (table) => `
INSERT INTO leaderboard.${table} (id, owner, rank, value, last_contribution_at, created_at, updated_at, _id, _block_range)
VALUES ($1, $1, 0, $2, $3, $4, $4, $5::uuid, $6::int8range)
ON CONFLICT (_id)
DO UPDATE 
SET value = leaderboard.${table}.value + EXCLUDED.value,
    last_contribution_at = EXCLUDED.last_contribution_at,
    updated_at = EXCLUDED.updated_at;
`;

const updateLeaderboardRanking = (table) => `
WITH ranked_entries AS (
  SELECT _id, 
         RANK() OVER (ORDER BY value DESC) AS new_rank
  FROM leaderboard.${table}
)
UPDATE leaderboard.${table} t
SET rank = r.new_rank
FROM ranked_entries r
WHERE t._id = r._id;
`;

const updateAccountedForStatus = `
UPDATE leaderboard.leaderboard_entries 
SET accounted_for = true 
WHERE accounted_for = false 
  AND created_at > $1 
  AND created_at <= $2
`;

const queries = {
  selectAccountsByAccountId,
  updateAccountsByAccountId,
  selectLeaderboardEntryByInterval,
  createOrUpdateLeaderboardEntry,
  updateLeaderboardRanking,
  updateAccountedForStatus,
};

module.exports = { connectToDB, entryTypeToTable, stringToUUID, queries };
