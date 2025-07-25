import { Pool, PoolClient } from 'pg';
import { config } from '../../config';

let pool: Pool | null = null;

/**
 * Connect to the database
 */
export const connectDb = async (): Promise<void> => {
  if (pool) {
    console.log('Database pool already exists');
    return;
  }

  pool = new Pool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    max: config.dbPoolSize,
    connectionTimeoutMillis: config.dbConnectionTimeoutMs,
  });

  // Test the connection
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

/**
 * Disconnect from the database
 */
export const disconnectDb = async (): Promise<void> => {
  if (!pool) {
    console.log('No database pool to disconnect');
    return;
  }

  try {
    await pool.end();
    pool = null;
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
    throw error;
  }
};

/**
 * Ensure database connection is healthy
 */
export const ensureDbConnection = async (): Promise<void> => {
  if (!pool) {
    await connectDb();
    return;
  }

  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
  } catch (error) {
    console.error('Database health check failed, reconnecting...', error);
    pool = null;
    await connectDb();
  }
};

/**
 * Get a database client from the pool
 */
export const getDbClient = async (): Promise<PoolClient> => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool.connect();
};

/**
 * Execute a query with automatic client management
 */
export const query = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool.query(text, params);
};
