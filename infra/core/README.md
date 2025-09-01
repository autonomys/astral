# Core Stack

The core stack contains the essential indexing services for Astral:

- PostgreSQL database
- PGCat connection pooler
- Hasura GraphQL engine
- Consensus indexer
- Files indexer
- Redis message queue
- Account worker
- Caddy reverse proxy (optional)

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
   - Configure Hasura secrets

## Available Commands

- `make setup` - Initial setup and prerequisite check
- `make build` - Build indexer projects
- `make start` - Start all services
- `make stop` - Stop all services
- `make restart` - Restart all services
- `make logs` - View logs (use `SVC=service_name` for specific service)
- `make status` - Show service status
- `make ps` - List running services
- `make clean` - Remove all data and containers

## Service URLs

- **Hasura GraphQL**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **PGCat**: localhost:6432
- **Redis**: localhost:6379

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

This command will:

1. Force rebuild the indexers with new environment variables (bypassing cache)
2. Recreate all containers with the new configuration

### Verifying configuration

To check what configuration values are being used:

```bash
make config
```

### View specific service logs

```bash
make logs SVC=consensus_indexer
make logs SVC=hasura
```

### Check service health

```bash
make status
```

### Restart a specific service

```bash
docker compose -p astral-core restart consensus_indexer
```

## Services Included

This core infrastructure includes:

- **PostgreSQL**: Primary database
- **PGCat**: Database connection pooler
- **Hasura**: GraphQL API layer
- **Consensus Indexer**: Indexes consensus chain events
- **Files Indexer**: Indexes file storage events
- **Redis**: Message queue for account processing
- **Account Worker**: Processes account balance updates
- **Caddy**: Optional reverse proxy

## Architecture

The core infrastructure provides a complete blockchain indexing solution:

1. **Indexers** monitor the Autonomys Network blockchain and extract events
2. **Consensus indexer** pushes account updates to **Redis queue**
3. **Account worker** processes queued updates to maintain current balances
4. **PostgreSQL** stores all indexed data with **PGCat** connection pooling
5. **Hasura** provides GraphQL API access to the indexed data
6. **Caddy** optionally provides reverse proxy and load balancing

## Requirements

## Account Worker

The account worker processes account balance updates asynchronously:

- **Queue**: Uses Redis to receive account update tasks from indexers
- **Processing**: Fetches current account data from RPC and updates database
- **Batching**: Processes multiple accounts efficiently in batches
- **Resilience**: Includes retry logic and health checks

### Worker Configuration

Key environment variables for account worker:

- `ACCOUNT_PROCESSING_QUEUE_NAME`: Redis queue name (default: account_updates_queue)
- `PROCESSING_DEPTH`: Block depth before processing (default: 10)
- `BATCH_SIZE`: Number of accounts to process per batch (default: 500)
- `QUEUE_PROCESSING_INTERVAL_MS`: How often to check queue (default: 5000ms)
