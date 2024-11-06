const { Pool } = require("pg");

const connectToDB = async (database = process.env.DB_TAURUS || "taurus") => {
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

const consensusSectionsQuery = `
  INSERT INTO consensus.sections (id, _id, _block_range)
  SELECT DISTINCT section as id, 
    gen_random_uuid() as _id,
    int8range($1::int8, $1::int8) as _block_range
  FROM (
    SELECT section FROM consensus.extrinsics WHERE _block_range @> $1::int8
    UNION
    SELECT section FROM consensus.events WHERE _block_range @> $1::int8
  ) combined_sections
  ON CONFLICT (id) DO NOTHING
  RETURNING *`;

// Get unique extrinsic modules
const consensusExtrinsicModulesQuery = `
  INSERT INTO consensus.extrinsic_modules (id, _id, section, method, _block_range)
  SELECT DISTINCT 
    LOWER(name) as id,
    gen_random_uuid() as _id,
    section,
    module as method,
    int8range($1::int8, $1::int8) as _block_range
  FROM consensus.extrinsics 
  WHERE _block_range @> $1::int8
  ON CONFLICT (id) DO NOTHING
  RETURNING *`;

// Get unique event modules
const consensusEventModulesQuery = `
  INSERT INTO consensus.event_modules (id, _id, section, method, _block_range)
  SELECT DISTINCT 
    LOWER(name) as id,
    gen_random_uuid() as _id,
    section,
    module as method,
    int8range($1::int8, $1::int8) as _block_range
  FROM consensus.events 
  WHERE _block_range @> $1::int8
  ON CONFLICT (id) DO NOTHING
  RETURNING *`;

// Get unique log kinds
const consensusLogKindsQuery = `
  INSERT INTO consensus.log_kinds (id, _id, _block_range)
  SELECT DISTINCT kind as id, 
    gen_random_uuid() as _id,
    int8range($1::int8, $1::int8) as _block_range
  FROM consensus.logs 
  WHERE _block_range @> $1::int8
  ON CONFLICT (id) DO NOTHING
  RETURNING *`;

// Update or insert accounts
const consensusAccountsQuery = `
  INSERT INTO consensus.accounts (id, _id, nonce, free, reserved, total, created_at, updated_at, _block_range)
  SELECT DISTINCT ON (id) 
    id,
    gen_random_uuid() as _id,
    nonce,
    free,
    reserved,
    total,
    created_at,
    updated_at,
    int8range($1::int8, $1::int8) as _block_range
  FROM consensus.account_histories
  WHERE _block_range @> $1::int8
  ON CONFLICT (id) 
  DO UPDATE SET
    nonce = EXCLUDED.nonce,
    free = EXCLUDED.free,
    reserved = EXCLUDED.reserved,
    total = EXCLUDED.total,
    created_at = EXCLUDED.created_at,
    updated_at = EXCLUDED.updated_at
  RETURNING *`;

// Get unique sections from both extrinsics and events
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
  consensusSectionsQuery,
  consensusExtrinsicModulesQuery,
  consensusEventModulesQuery,
  consensusLogKindsQuery,
  consensusAccountsQuery,
  updateLeaderboardRanking,
};

module.exports = { connectToDB, entryTypeToTable, queries };
