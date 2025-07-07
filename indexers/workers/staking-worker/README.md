# Staking Worker

This worker handles the lazy conversion of deposits and withdrawals in the Subspace staking system.

## Overview

The staking worker processes two main types of conversions:

1. **Deposit Conversion**: Converts pending deposits to known deposits when share prices become available
2. **Withdrawal Conversion**: Converts `withdrawalInShares` to balance amounts when share prices become available

## Important: Table Management

### Indexer-Managed Tables (Read-Only for Worker)
These tables are populated by the SubQuery indexer and reflect the exact on-chain state:
- `staking.nominator_deposits` - Raw deposit data from blockchain
- `staking.nominator_withdrawals` - Raw withdrawal data from blockchain
- `staking.operator_epoch_share_prices` - Historical share prices

**The worker ONLY updates the `processed` flag in these tables and NEVER modifies any other fields.**

### Worker-Managed Tables
These tables are updated by the worker with calculated values:
- `staking.nominators` - Aggregated nominator state with converted values
  - `known_shares` - Total shares after conversions
  - `known_storage_fee_deposit` - Total storage deposits after conversions
  - `total_withdrawal_amounts` - Total withdrawal amounts after conversions
  - `unlock_at_confirmed_domain_block_number` - JSONB array of pending unlocks

This separation ensures:
- Data integrity is maintained
- On-chain state can always be traced
- Calculated values are clearly separated from raw data

## How It Works

### Lazy Conversion Process

In the Subspace runtime, conversions happen lazily - meaning pending deposits and withdrawals in shares are only converted when:
- A new deposit/withdrawal/unlock action occurs for that nominator
- The share price for the relevant epoch becomes available

This worker replicates that behavior by:
1. Periodically checking for unprocessed deposits and withdrawals (where `processed = false`)
2. Checking if the share price for the relevant epoch is available
3. Performing the conversion calculations
4. Updating the database records

### Deposit Processing

For each unprocessed deposit with `pending_amount > 0`:
1. Check if `OperatorEpochSharePrice` exists for the `pending_effective_domain_epoch`
2. If available, convert: `shares = pending_amount * MULTIPLIER / share_price`
3. Update records:
   - Set `processed = true` in `nominator_deposits` table
   - Update `nominators` table with calculated values (add to known_shares, known_storage_fee_deposit)

### Withdrawal Processing

For each unprocessed withdrawal with `withdrawal_in_shares_amount > 0`:
1. Check if `OperatorEpochSharePrice` exists for the `withdrawal_in_shares_domain_epoch`
2. If available, convert: `amount = shares * share_price / MULTIPLIER`
3. Update records:
   - Set `processed = true` in `nominator_withdrawals` table
   - Update `nominators` table with calculated values (update withdrawal totals and unlock blocks)

## Configuration

The worker is configured via environment variables:

```bash
# Database connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=astral
DB_USER=postgres
DB_PASSWORD=postgres

# Redis connection (for future use)
REDIS_HOST=localhost
REDIS_PORT=6379

# Worker settings
BATCH_SIZE=100
QUEUE_PROCESSING_INTERVAL_MS=30000
EPOCH_TRANSITION_CHECK_INTERVAL_MS=60000
```

## Database Schema

The worker interacts with these main tables:

### Read-Only (Indexer-Managed)
- `staking.nominator_deposits` - Tracks deposit state (only `processed` flag is updated)
- `staking.nominator_withdrawals` - Tracks withdrawal state (only `processed` flag is updated)
- `staking.operator_epoch_share_prices` - Historical share prices (read-only)
- `staking.operator_staking_histories` - Operator state history (read-only)

### Read-Write (Worker-Managed)
- `staking.nominators` - Aggregated nominator state with all calculated values

## Notes

- The worker processes records in batches to avoid overwhelming the database
- All updates are wrapped in transactions for consistency
- The `processed` flag ensures records are only converted once
- Share prices are calculated with 18 decimal precision (`SHARES_CALCULATION_MULTIPLIER = 10^18`)
- Original blockchain data is never modified, only derived values are calculated