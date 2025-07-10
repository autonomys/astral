import { Pool } from 'pg';
import { config } from '../config';
import { AccountHistoryUpdateData } from '../interfaces';
import { isRetriableDatabaseError } from '../utils';
import { retryOperation } from './utils';

let pool: Pool;
const accountLocks = new Map<string, Promise<void>>();

/**
 * Retry helper specifically for connection attempts
 */
const retryConnection = async <T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries: number = 3,
  initialDelay: number = 100,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Don't retry if it's the last attempt
      if (attempt === maxRetries) {
        console.error(`${operationName} failed after ${maxRetries + 1} attempts:`, error);
        throw error;
      }

      // Calculate delay with exponential backoff (capped at 5 seconds for fast systems)
      const delay = Math.min(initialDelay * Math.pow(2, attempt), 5000);
      console.log(`${operationName} attempt ${attempt + 1} failed, retrying in ${delay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

const connectDb = async (): Promise<void> => {
  if (pool) {
    console.log('Database pool already created.');
    return;
  }
  try {
    pool = new Pool({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      max: config.dbPoolMax,
      min: config.dbPoolMin,
      idleTimeoutMillis: config.dbIdleTimeoutMs,
      connectionTimeoutMillis: config.dbConnectionTimeoutMs,
      query_timeout: config.dbQueryTimeoutMs,
      statement_timeout: config.dbStatementTimeoutMs,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

    // Test the connection with retry
    await retryConnection(
      async () => {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL successfully.');
        client.release();
      },
      'Database connection',
      3,
    );

    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client', err, client);
      // Don't crash the process on pool errors
    });

    pool.on('remove', () => {
      console.log('Client removed from pool');
    });
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    throw error;
  }
};

const disconnectDb = async (): Promise<void> => {
  if (pool) {
    const _discounect = await pool.end();
    console.log('Disconnected from PostgreSQL.');
  }
};

/**
 * Health check for database pool
 * Returns true if healthy, false otherwise
 */
const checkDbHealth = async (): Promise<boolean> => {
  if (!pool) {
    console.error('Database pool not initialized');
    return false;
  }

  try {
    // Try to get a client and run a simple query
    const client = await Promise.race([
      pool.connect(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Health check timeout')), 1000),
      ),
    ]);

    try {
      await client.query('SELECT 1');
      return true;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

/**
 * Ensures database connection is healthy, attempts to reconnect if not
 */
const ensureDbConnection = async (): Promise<void> => {
  const isHealthy = await checkDbHealth();

  if (!isHealthy) {
    console.log('Database connection unhealthy, attempting to reconnect...');

    // Try to end the current pool gracefully
    if (pool) {
      try {
        await pool.end();
      } catch (error) {
        console.error('Error ending unhealthy pool:', error);
      }
      pool = null as any;
    }

    // Attempt to reconnect
    await connectDb();
  }
};

/**
 * Get a lock for an account
 */

const acquireAccountLock = async (accountId: string): Promise<() => void> => {
  if (accountLocks.has(accountId)) {
    await accountLocks.get(accountId)!;
  }
  let releaseLock: () => void;

  const lockPromise = new Promise<void>((resolve) => {
    releaseLock = () => {
      accountLocks.delete(accountId);
      resolve();
    };
  });

  accountLocks.set(accountId, lockPromise);
  return releaseLock!;
};

/**
 * Get a database client with retry logic for connection timeouts
 */
const getClientWithRetry = async (): Promise<any> => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDb() first.');
  }

  return await retryConnection(async () => pool.connect(), 'Get database client', 2, 100);
};

/**
 * Updates multiple AccountHistory records with individual transactions per update.
 * Returns the successfully updated records grouped by account address and failed updates.
 */
const batchUpdateAccountHistories = async (
  updates: AccountHistoryUpdateData[],
): Promise<{
  successful: Map<string, AccountHistoryUpdateData>;
  failed: AccountHistoryUpdateData[];
}> => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDb() first.');
  }

  if (updates.length === 0) return { successful: new Map(), failed: [] };

  const latestByAccount = new Map<string, AccountHistoryUpdateData>();
  const failedUpdates: AccountHistoryUpdateData[] = [];

  // Process updates in smaller chunks to avoid overwhelming the database
  const CHUNK_SIZE = config.dbUpdateChunkSize;

  for (let i = 0; i < updates.length; i += CHUNK_SIZE) {
    const chunk = updates.slice(i, i + CHUNK_SIZE);
    console.log(
      `Processing chunk ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(updates.length / CHUNK_SIZE)} (${chunk.length} updates)`,
    );

    // Update account_histories records in this chunk - each with its own transaction
    const updatePromises = chunk.map(async (data) => {
      const { id, nonce, free, reserved, total, blockHeight } = data;

      // Get a dedicated client for this update
      let client;
      try {
        client = await getClientWithRetry();
      } catch (error) {
        console.error(`Failed to get client for ${id}:`, error);
        failedUpdates.push(data);
        return { success: false, data };
      }

      try {
        // Start individual transaction for this update
        const _begin = await client.query('BEGIN');
        const query = `
          UPDATE consensus.account_histories
          SET
            nonce = $1,
            free = $2,
            reserved = $3,
            total = $4
          WHERE id = $5 AND created_at = $6;
        `;

        const values = [nonce, free, reserved, total, id, blockHeight];

        const _result = await retryOperation(
          async () => {
            const queryResult = await client.query(query, values);

            // If no rows were updated, throw an error to trigger retry
            if (!queryResult.rowCount || queryResult.rowCount === 0) {
              throw new Error(
                `No AccountHistory record found for address: ${id} (block ${blockHeight} - retrying)`,
              );
            }

            return queryResult;
          },
          2,
          50,
        );

        const _commit = await client.query('COMMIT');

        return { success: true, data };
      } catch (error) {
        // Rollback individual transaction on error
        try {
          const _rollback = await client.query('ROLLBACK');
        } catch (rollbackError) {
          console.error(`Rollback failed for ${id}:`, rollbackError);
        }

        // All retries exhausted - record still not found or other error
        if (error instanceof Error && error.message.includes('No AccountHistory record found')) {
          console.warn(
            `AccountHistory record not found after retries for address: ${id} (block ${blockHeight})`,
          );
          // Add to failed list for re-queuing
          failedUpdates.push(data);
        } else if (isRetriableDatabaseError(error)) {
          console.warn(
            `Database error for address: ${id} (block ${blockHeight}), will re-queue - ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
          // Add to failed list for re-queuing
          failedUpdates.push(data);
        } else {
          console.error(`Error updating AccountHistory for address ${id} after retries:`, error);
        }
        return { success: false, data };
      } finally {
        if (client) {
          const _release = client.release();
        }
      }
    });

    // Process chunk and wait for completion before moving to next chunk
    const results = await Promise.all(updatePromises);

    // Group successful updates by account address to get the latest data for each account
    for (const result of results) {
      if (result.success) {
        const existing = latestByAccount.get(result.data.id);
        // Keep the update with the highest block number
        if (!existing || result.data.blockHeight > existing.blockHeight) {
          latestByAccount.set(result.data.id, result.data);
        }
      }
    }

    // Small delay between chunks to give database time to breathe
    if (i + CHUNK_SIZE < updates.length) {
      await new Promise((resolve) => setTimeout(resolve, config.dbUpdateChunkDelayMs));
    }
  }

  console.log(
    `Account histories batch update completed: ${latestByAccount.size}/${updates.length} records updated, ${failedUpdates.length} failed`,
  );
  return { successful: latestByAccount, failed: failedUpdates };
};

/**
 * Updates multiple accounts in the accounts table using upsert operations.
 * Takes a map of account data (typically from batchUpdateAccountHistories).
 */
const batchUpdateAccounts = async (
  accountUpdates: Map<string, AccountHistoryUpdateData>,
): Promise<number> => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDb() first.');
  }

  if (accountUpdates.size === 0) return 0;

  const client = await getClientWithRetry();

  try {
    const _begin = await client.query('BEGIN');

    const sortedAccountUpdates = Array.from(accountUpdates.entries()).sort(
      ([addressA], [addressB]) => addressA.localeCompare(addressB),
    );

    // Update the accounts table with the latest data for each unique account
    const accountUpdatePromises = sortedAccountUpdates.map(async ([address, data]) => {
      const releaseLock = await acquireAccountLock(address);
      try {
        const accountQuery = `
        INSERT INTO consensus.accounts (
          id,
          nonce,
          free,
          reserved,
          total,
          created_at,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          EXTRACT(EPOCH FROM NOW())
        )
        ON CONFLICT (id) DO UPDATE SET
          nonce = EXCLUDED.nonce,
          free = EXCLUDED.free,
          reserved = EXCLUDED.reserved,
          total = EXCLUDED.total,
          created_at = EXCLUDED.created_at,
          updated_at = EXTRACT(EPOCH FROM NOW())
        WHERE consensus.accounts.created_at < EXCLUDED.created_at;
      `;

        const accountValues = [
          address,
          data.nonce,
          data.free,
          data.reserved,
          data.total,
          data.blockHeight,
        ];

        await retryOperation(
          async () => {
            return await client.query(accountQuery, accountValues);
          },
          3,
          100,
        );
      } catch (error) {
        console.error(`Error updating account ${address} after retries:`, error);
      } finally {
        releaseLock();
      }
    });

    // Execute all account updates in parallel
    const accountResults = await Promise.all(accountUpdatePromises);
    const accountsUpdated = accountResults.filter((result) => result).length;

    const _commit = await client.query('COMMIT');

    console.log(
      `Accounts batch update completed: ${accountsUpdated}/${accountUpdates.size} accounts updated`,
    );
    return accountsUpdated;
  } catch (error) {
    const _rollback = await client.query('ROLLBACK');
    console.error('Accounts batch update failed, transaction rolled back:', error);
    throw error;
  } finally {
    const _release = client.release();
  }
};

const batchUpdateAccountHistoriesAndAccounts = async (
  updates: AccountHistoryUpdateData[],
): Promise<{
  historiesUpdated: number;
  accountsUpdated: number;
  failedUpdates: AccountHistoryUpdateData[];
}> => {
  try {
    const { successful, failed } = await batchUpdateAccountHistories(updates);
    const accountsUpdated = await batchUpdateAccounts(successful);

    return {
      historiesUpdated: successful.size,
      accountsUpdated,
      failedUpdates: failed,
    };
  } catch (error) {
    // If we get a connection timeout or other critical error,
    // mark all updates as failed so they can be re-queued
    console.error('Critical error in batchUpdateAccountHistoriesAndAccounts:', error);

    // Return all updates as failed if we couldn't even connect or hit deadlocks
    if (isRetriableDatabaseError(error)) {
      console.error(
        'Critical database error (connection/deadlock/timeout/transaction abort), marking all updates as failed',
      );
      return {
        historiesUpdated: 0,
        accountsUpdated: 0,
        failedUpdates: updates, // Return ALL updates as failed
      };
    }

    // Re-throw other errors
    throw error;
  }
};

export {
  batchUpdateAccountHistoriesAndAccounts,
  checkDbHealth,
  connectDb,
  disconnectDb,
  ensureDbConnection,
  getClientWithRetry,
};
