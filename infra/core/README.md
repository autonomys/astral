# Core Stack

The core stack contains the essential indexing services for Astral:

- PostgreSQL database
- PGCat connection pooler
- Hasura GraphQL engine
- Consensus indexer
- Files indexer
- API service
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
- **API**: http://localhost:3030
- **PostgreSQL**: localhost:5432
- **PGCat**: localhost:6432

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
