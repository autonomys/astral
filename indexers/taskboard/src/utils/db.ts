import { Pool, PoolConfig } from "pg";

export const connectToDB = async (): Promise<Pool> => {
  const dbConfig: PoolConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  const pool = new Pool(dbConfig);
  return pool;
};

export const entryTypeToTable = (entryType: string): string =>
  entryType
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "") + "s";

// Get unique sections from both extrinsics and events
export const updateLeaderboardRanking = (
  sourceTable: string,
  targetTable: string
) => `
  WITH aggregated_entries AS (
    SELECT account_id, 
          SUM(value) AS total_value,
          MAX(last_contribution_at) AS last_contribution_at,
          MIN(block_height) AS created_at,
          MAX(block_height) AS updated_at
    FROM leaderboard.${sourceTable}
    GROUP BY account_id
  ),
  ranked_entries AS (
    SELECT account_id as id, 
          ROW_NUMBER() OVER (ORDER BY total_value DESC, account_id) AS new_rank,
          total_value,
          last_contribution_at,
          created_at,
          updated_at
    FROM aggregated_entries
  )
  INSERT INTO leaderboard.${targetTable} (id, rank, value, last_contribution_at, created_at, updated_at)
  SELECT id, new_rank, total_value, last_contribution_at, created_at, updated_at FROM ranked_entries
  ON CONFLICT (id) 
  DO UPDATE SET rank = EXCLUDED.rank, value = EXCLUDED.value, last_contribution_at = EXCLUDED.last_contribution_at, updated_at = EXCLUDED.updated_at;
`;
