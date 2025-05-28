import { Pool } from 'pg';
import { config } from '../config';
import { AccountHistoryUpdateData } from '../interfaces';

let pool: Pool;

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
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully.');
    client.release();

    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client', err, client);
    });

  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    throw error;
  }
}

const disconnectDb = async (): Promise<void> => {
  if (pool) {
    const _discounect = await pool.end();
    console.log('Disconnected from PostgreSQL.');
  }
}

/**
 * Updates multiple AccountHistory records and the accounts table in a single transaction.
 * Directly updates accounts table to avoid trigger-based deadlocks.
 */
const batchUpdateAccountHistories = async (updates: AccountHistoryUpdateData[]): Promise<number> => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDb() first.');
  }

  if (updates.length === 0) return 0;

  const client = await pool.connect();
  let successCount = 0;

  try {
    const _begin = await client.query('BEGIN');

    // First, update all account_histories records
    const updatePromises = updates.map(async (data) => {
      const { id, nonce, free, reserved, total, eventBlockNumber } = data;
      
      const query = `
        UPDATE consensus.account_histories
        SET
          nonce = $1,
          free = $2,
          reserved = $3,
          total = $4
        WHERE id = $5 AND created_at = $6;
      `;

      const values = [
        nonce, 
        free,
        reserved,
        total,
        id,
        eventBlockNumber
      ];

      try {
        const result = await client.query(query, values);
        if (result.rowCount && result.rowCount > 0) {
          return { success: true, data };
        }
        console.warn(`No AccountHistory record found for address: ${id} (block ${eventBlockNumber})`);
        return { success: false, data };
      } catch (error) {
        console.error(`Error updating AccountHistory for address ${id}:`, error);
        return { success: false, data };
      }
    });

    const results = await Promise.all(updatePromises);
    
    // Group successful updates by account address to get the latest data for each account
    const latestByAccount = new Map<string, AccountHistoryUpdateData>();
    
    for (const result of results) {
      if (result.success) {
        successCount++;
        const existing = latestByAccount.get(result.data.id);
        // Keep the update with the highest block number
        if (!existing || result.data.eventBlockNumber > existing.eventBlockNumber) {
          latestByAccount.set(result.data.id, result.data);
        }
      }
    }

    // Now update the accounts table with the latest data for each unique account
    // Do this in parallel since each account is unique - no deadlocks possible
    const accountUpdatePromises = Array.from(latestByAccount.entries()).map(async ([address, data]) => {
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
          updated_at = EXTRACT(EPOCH FROM NOW());
      `;

      const accountValues = [
        address,
        data.nonce,
        data.free,
        data.reserved,
        data.total,
        data.eventBlockNumber
      ];

      try {
        const _updateAccount = await client.query(accountQuery, accountValues);
        return true;
      } catch (error) {
        console.error(`Error updating account ${address}:`, error);
        return false;
      }
    });

    // Execute all account updates in parallel
    const accountResults = await Promise.all(accountUpdatePromises);
    const accountsUpdated = accountResults.filter(result => result).length;

    const _commit = await client.query('COMMIT');
    
    console.log(`Batch update completed: ${successCount}/${updates.length} account histories updated, ${accountsUpdated}/${latestByAccount.size} accounts updated`);
    return successCount;
  } catch (error) {
    const _rollback = await client.query('ROLLBACK');
    console.error('Batch update failed, transaction rolled back:', error);
    throw error;
  } finally {
    client.release();
  }
} 

export {
  batchUpdateAccountHistories,
  connectDb,
  disconnectDb
};
