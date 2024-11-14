import { Pool, PoolConfig } from "pg";

export const connectToDB = async (): Promise<Pool> => {
  const dbConfig: PoolConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
  };

  const pool = new Pool(dbConfig);
  return pool;
};

export const entryTypeToTable = (entryType: string): string =>
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
const updateLeaderboardRanking = (sourceTable: string, targetTable: string) => `
  WITH aggregated_entries AS (
    SELECT id, 
           SUM(value) AS total_value,
           MAX(last_contribution_at) AS last_contribution_at,
           MIN(created_at) AS created_at,
           MAX(updated_at) AS updated_at
    FROM leaderboard.${sourceTable}
    GROUP BY id
  ),
  ranked_entries AS (
    SELECT id, 
           ROW_NUMBER() OVER (ORDER BY total_value DESC, id) AS new_rank,
           total_value,
           last_contribution_at,
           created_at,
           updated_at
    FROM aggregated_entries
  )
  INSERT INTO leaderboard.${targetTable} (id, rank, value, last_contribution_at, created_at, updated_at)
  SELECT id, new_rank, total_value, last_contribution_at, created_at, updated_at FROM ranked_entries
  ON CONFLICT (id) 
  DO UPDATE SET rank = EXCLUDED.rank, value = EXCLUDED.value, last_contribution_at = EXCLUDED.last_contribution_at, created_at = EXCLUDED.created_at, updated_at = EXCLUDED.updated_at;
  `;

const consensusUpsertAccountQuery = `
    INSERT INTO consensus.accounts (id, _id, nonce, free, reserved, total, created_at, updated_at, _block_range)
    VALUES ($1, gen_random_uuid(), $2, $3, $4, $5, $6, $6, int8range($7::int8, $7::int8))
    ON CONFLICT (id) 
    DO UPDATE SET
      nonce = $2,
      free = $3,
      reserved = $4,
      total = $5,
      updated_at = $6
    RETURNING *`;

interface Queries {
  consensusSectionsQuery: string;
  consensusExtrinsicModulesQuery: string;
  consensusEventModulesQuery: string;
  consensusLogKindsQuery: string;
  consensusAccountsQuery: string;
  updateLeaderboardRanking: (
    sourceTable: string,
    targetTable: string
  ) => string;
  consensusUpsertAccountQuery: string;
}

export const queries: Queries = {
  consensusSectionsQuery,
  consensusExtrinsicModulesQuery,
  consensusEventModulesQuery,
  consensusLogKindsQuery,
  consensusAccountsQuery,
  updateLeaderboardRanking,
  consensusUpsertAccountQuery,
};
