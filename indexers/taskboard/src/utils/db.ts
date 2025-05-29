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

export const STATS_TABLES = ["hourly", "daily", "weekly", "monthly"] as const;
type StatsTableType = (typeof STATS_TABLES)[number];

const getPostgresTimeUnit = (timeFrame: StatsTableType): string => {
  const timeUnits = {
    hourly: "hour",
    daily: "day",
    weekly: "week",
    monthly: "month",
  } as const;

  return timeUnits[timeFrame];
};

export const generateStatsQuery = (timeFrame: StatsTableType) => `
WITH last_completed_${getPostgresTimeUnit(timeFrame)} AS (
    SELECT start_date as last_date, cumulated_history_size as last_history_size
    FROM stats.${timeFrame}
    WHERE start_date < DATE_TRUNC('${getPostgresTimeUnit(timeFrame)}', NOW())
    ORDER BY start_date DESC
    LIMIT 2
), 
${timeFrame}_stats AS (
    SELECT 
        DATE_TRUNC('${getPostgresTimeUnit(timeFrame)}', "timestamp") AS ${getPostgresTimeUnit(timeFrame)},
        -- MAX(blockchain_size) AS max_blockchain_size,
        0 AS max_blockchain_size,
        MIN(height) AS start_block,
        MAX(height) AS end_block,
        MIN("timestamp") AS start_date,
        MAX("timestamp") AS end_date,
        CASE 
            WHEN EXISTS (SELECT 1 FROM last_completed_${getPostgresTimeUnit(timeFrame)}) THEN
                -- MAX(blockchain_size) - (SELECT last_history_size FROM last_completed_${getPostgresTimeUnit(timeFrame)} ORDER BY last_history_size DESC OFFSET 1 LIMIT 1)
                0 - (SELECT last_history_size FROM last_completed_${getPostgresTimeUnit(timeFrame)} ORDER BY last_history_size DESC OFFSET 1 LIMIT 1)
            ELSE 
                -- MAX(blockchain_size)
                0
        END AS delta_size
    FROM consensus.blocks
    WHERE 
        CASE 
            WHEN EXISTS (SELECT 1 FROM last_completed_${getPostgresTimeUnit(timeFrame)}) THEN
                "timestamp" >= (SELECT last_date FROM last_completed_${getPostgresTimeUnit(timeFrame)} ORDER BY last_date DESC LIMIT 1)
            ELSE true
        END
    GROUP BY DATE_TRUNC('${getPostgresTimeUnit(timeFrame)}', "timestamp")
)
INSERT INTO stats.${timeFrame} (
    id,
    cumulated_history_size,
    delta_history_size,
    start_date,
    start_block,
    end_date,
    end_block,
    updated_at
)
SELECT 
    ${getPostgresTimeUnit(timeFrame)}::text AS id,
    max_blockchain_size AS cumulated_history_size,
    COALESCE(delta_size, 0) AS delta_history_size,
    start_date,
    start_block,
    end_date,
    end_block,
    NOW() AS updated_at
FROM ${timeFrame}_stats
ON CONFLICT (id) DO UPDATE 
SET 
    cumulated_history_size = EXCLUDED.cumulated_history_size,
    delta_history_size = EXCLUDED.delta_history_size,
    start_date = EXCLUDED.start_date,
    start_block = EXCLUDED.start_block,
    end_date = EXCLUDED.end_date,
    end_block = EXCLUDED.end_block,
    updated_at = NOW();
`;
