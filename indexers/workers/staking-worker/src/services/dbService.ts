import { Pool, PoolClient } from 'pg';
import { config } from '../config';

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

// Staking-specific database operations

/**
 * Update operator in database
 */
export const updateOperator = async (operatorData: any): Promise<void> => {
  // TODO: Implement operator update logic
  console.log('Updating operator in database:', operatorData.id);
};

/**
 * Update nominator in database
 */
export const updateNominator = async (nominatorData: any): Promise<void> => {
  // TODO: Implement nominator update logic
  console.log('Updating nominator in database:', nominatorData.id);
};

/**
 * Update domain in database
 */
export const updateDomain = async (domainData: any): Promise<void> => {
  // TODO: Implement domain update logic
  console.log('Updating domain in database:', domainData.id);
};

/**
 * Update withdrawal in database
 */
export const updateWithdrawal = async (withdrawalData: any): Promise<void> => {
  // TODO: Implement withdrawal update logic
  console.log('Updating withdrawal in database:', withdrawalData.id);
};

/**
 * Batch update operators
 */
export const batchUpdateOperators = async (operators: any[]): Promise<void> => {
  // TODO: Implement batch operator update logic
  console.log(`Batch updating ${operators.length} operators`);
};

/**
 * Batch update nominators
 */
export const batchUpdateNominators = async (nominators: any[]): Promise<void> => {
  // TODO: Implement batch nominator update logic
  console.log(`Batch updating ${nominators.length} nominators`);
};

/**
 * Get pending withdrawals ready for unlock
 */
export const getPendingWithdrawals = async (domainId: string, blockNumber: bigint): Promise<any[]> => {
  // TODO: Implement query to get pending withdrawals
  console.log(`Getting pending withdrawals for domain ${domainId} at block ${blockNumber}`);
  return [];
};

/**
 * Get operators by domain
 */
export const getOperatorsByDomain = async (domainId: string): Promise<any[]> => {
  // TODO: Implement query to get operators by domain
  console.log(`Getting operators for domain ${domainId}`);
  return [];
};

/**
 * Get nominators by operator
 */
export const getNominatorsByOperator = async (operatorId: string): Promise<any[]> => {
  // TODO: Implement query to get nominators by operator
  console.log(`Getting nominators for operator ${operatorId}`);
  return [];
};

/**
 * Update unprocessed block height
 */
export const updateUnprocessedBlock = async (blockHeight: bigint): Promise<void> => {
  // TODO: Implement update of unprocessed block height
  console.log(`Updating unprocessed block to ${blockHeight}`);
};

/**
 * Execute transaction with rollback on error
 */
export const withTransaction = async <T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const client = await getDbClient();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};