# Staking Stack

The staking stack contains specialized services for tracking staking and operator rewards:

- Dedicated PostgreSQL database
- PGCat connection pooler
- Redis for worker coordination
- Staking indexer
- Staking worker (rewards processing)

## Quick Start

```bash
# First time setup
make setup

# Start all services
make start

# View logs
make logs

# Check status
make status
```

## Configuration

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your configuration:
   - Set `RPC_URLS` to your node endpoint
   - Update database credentials
   - Configure worker processing intervals

## Available Commands

- `make setup` - Initial setup and prerequisite check
- `make build` - Build indexer and worker projects
- `make start` - Start all services
- `make stop` - Stop all services
- `make restart` - Restart all services
- `make logs` - View logs (use `SVC=service_name` for specific service)
- `make status` - Show service status
- `make ps` - List running services
- `make clean` - Remove all data and containers

## Service URLs

- **Staking PostgreSQL**: localhost:5433
- **Staking PGCat**: localhost:6433
- **Staking Redis**: localhost:6380
- **Staking Indexer**: http://localhost:3002

## Production Deployment

For production, use:

```bash
make start ENV=prod
```

This will use `docker-compose.prod.yml` if it exists.

## Troubleshooting

### Environment changes not taking effect

If you update `.env` (especially RPC_URLS or CHAIN_ID), you need to rebuild and recreate containers:

```bash
make reload
```

### Verifying configuration

To check what configuration values are being used:

```bash
make config
```

### View specific service logs

```bash
make logs SVC=staking_indexer
make logs SVC=staking_worker
```

### Check service health

```bash
make status
```

### Restart a specific service

```bash
docker compose -p astral-staking restart staking_worker
```

## Services Included

### Staking Infrastructure

- **Staking PostgreSQL**: Dedicated database for staking data
- **Staking PGCat**: Connection pooler for staking database
- **Staking Redis**: Message queue and coordination for staking worker
- **Staking Indexer**: Indexes staking and operator events
- **Staking Worker**: Processes rewards calculations

## Architecture

The staking infrastructure provides specialized processing for staking rewards:

1. **Staking indexer** monitors blockchain for staking/operator events
2. **Staking worker** periodically calculates and updates rewards
3. **Dedicated PostgreSQL** stores all staking data separately
4. **PGCat** provides connection pooling for efficient database access

## Staking Worker Configuration

Key environment variables for staking worker:

- `STAKING_PROCESSING_INTERVAL_MS`: How often to process rewards (default: 60000ms)
- `STAKING_BATCH_SIZE`: Number of records to process per batch (default: 100)
- `STAKING_DB_POOL_MAX`: Maximum database connections (default: 10)
- `STAKING_DB_POOL_MIN`: Minimum database connections (default: 2)

## Database Schema

The staking database uses dedicated schemas initialized from:

- `/indexers/db/docker-entrypoint-initdb.d/staking-only/`

This includes tables for:

- Operators
- Nominators
- Rewards
- Deposits
- Withdrawals
- And other staking-related data

## Monitoring

To monitor the staking infrastructure:

1. **Check indexer health**:

   ```bash
   curl http://localhost:3002/ready
   ```

2. **View worker logs**:

   ```bash
   make logs SVC=staking_worker
   ```

3. **Database connections**:
   ```bash
   docker exec -it astral-staking-staking_postgres-1 psql -U staking_user -d astral_staking -c "SELECT count(*) FROM pg_stat_activity;"
   ```

## Integration with Core Stack

The staking stack runs independently from the core stack but shares:

- The same RPC endpoint configuration
- Similar infrastructure patterns
- Common Docker network (if needed)

To run both stacks together:

```bash
# From project root
cd infra/core && make start
cd ../staking && make start
```

Or use the deploy script:

```bash
./deploy.sh start all
```
