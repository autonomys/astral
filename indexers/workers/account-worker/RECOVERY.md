# Account Worker Recovery Guide

## Retry Mechanisms

The account worker now includes comprehensive retry mechanisms to prevent data loss:

### 1. Connection Retry Logic
- **Initial Connection**: Retries up to 3 times with exponential backoff (100ms, 200ms, 400ms)
- **Connection Timeout**: 3 seconds (optimized for high-frequency operations)
- **Query Timeout**: 5 seconds (reduced for faster failure detection)

### 2. Database Health Checks
- **Periodic Checks**: Every 10 seconds
- **Pre-processing Check**: Before each batch processing
- **Auto-reconnection**: Automatically reconnects if health check fails

### 3. Task Re-queuing
The worker now properly re-queues tasks in the following scenarios:

#### Connection/Timeout Errors
- When database connection times out
- When pool connection fails
- **ALL tasks** in the batch are re-queued

#### Deadlock Errors
- When PostgreSQL reports deadlock detected
- When serialization failures occur
- When concurrent update conflicts happen
- Error codes: 40P01 (deadlock), 40001 (serialization failure)
- **Individual tasks** or **entire batch** re-queued depending on error level

#### Transaction Abort Errors
- When a transaction is aborted due to failed queries
- Error code: 25P02 (transaction aborted)
- Now uses individual transactions per update to prevent cascade failures
- **Individual tasks** re-queued when transaction aborts occur

#### Individual Record Failures
- When AccountHistory record not found
- Only failed tasks are re-queued

### 4. Task Format Preservation
Tasks are re-queued with their original format:
```json
{
  "address": "string",
  "blockHeight": "number",
  "blockHash": "string",
  "timestamp": "number"
}
```

## Monitoring Connection Issues

Look for these log messages:

```
Worker: Critical database error detected, re-queuing all tasks to prevent data loss
Worker: Re-queued ALL X tasks due to database connection/deadlock error
Database health check failed: Error: ...
Deadlock/serialization error for address: ... will re-queue
```

## Deadlock Prevention Tips

1. **Consistent Ordering**: The worker processes accounts in alphabetical order to reduce deadlock chances
2. **Batch Size**: Smaller batches reduce the chance of conflicts
3. **Connection Pool**: Properly sized pool (min: 5, max: 20) prevents connection starvation
4. **Isolation Level**: Consider adjusting PostgreSQL isolation level if deadlocks are frequent

## Manual Recovery

If data loss occurred before these improvements:

1. **Check Recent Logs**: Look for tasks that were processed but failed:
   ```
   Worker: Task details: [...]
   Worker: First 5 tasks: [...]
   ```

2. **Re-queue Lost Tasks**: If you have the task details, you can manually re-queue them:
   ```bash
   # Connect to Redis
   redis-cli
   
   # Push task to queue (replace with actual task data)
   RPUSH account:processing:queue '{"address":"...", "blockHeight":123, "blockHash":"...", "timestamp":1234567890}'
   ```

3. **Check Database for Gaps**: Query for missing account history entries:
   ```sql
   -- Find gaps in account histories
   SELECT DISTINCT a.id, ah.created_at 
   FROM consensus.accounts a
   LEFT JOIN consensus.account_histories ah ON a.id = ah.id
   WHERE ah.id IS NULL
   ORDER BY a.id;
   ```

## Configuration Recommendations

For high-load environments, consider:

1. Increase connection pool size in `dbService.ts`:
   ```typescript
   max: 30, // Increased from 20
   min: 10, // Increased from 5
   ```

2. Adjust timeouts based on your database performance:
   ```typescript
   connectionTimeoutMillis: 5000, // If network is slow
   query_timeout: 10000, // If queries are complex
   ```

3. Adjust batch size in config:
   - Smaller batches = less chance of deadlocks, more frequent commits
   - Larger batches = better throughput but higher deadlock risk

## Prevention Tips

1. **Monitor Database Load**: High load can cause timeouts and increase deadlock chances
2. **Check Network Stability**: Network issues are common causes
3. **Database Connection Limits**: Ensure database can handle connection pool size
4. **Regular Backups**: Keep Redis queue backups for disaster recovery
5. **Monitor Deadlocks**: Use PostgreSQL's `pg_stat_database` to track deadlock counts 