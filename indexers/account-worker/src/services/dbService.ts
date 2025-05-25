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
 * Updates multiple AccountHistory records in a single transaction.
 * Much more efficient than individual updates.
 */
const batchUpdateAccountHistories = async (updates: AccountHistoryUpdateData[]): Promise<number> => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDb() first.');
  }

  if (updates.length === 0) return 0;

  const client = await pool.connect();
  let successCount = 0;

  try {
    await client.query('BEGIN');

    // Prepare batch update query
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
          successCount++;
          return true;
        }
        console.warn(`No AccountHistory record found for address: ${id} (block ${eventBlockNumber})`);
        return false;
      } catch (error) {
        console.error(`Error updating AccountHistory for address ${id}:`, error);
        return false;
      }
    });

    const _update = await Promise.all(updatePromises);
    const _commit = await client.query('COMMIT');
    
    console.log(`Batch update completed: ${successCount}/${updates.length} accounts updated successfully`);
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
