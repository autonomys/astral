# Astral Production Deployment Guide

![Autonomys Banner](https://github.com/autonomys/astral/blob/main/.github/images/autonomys-banner.webp)

This guide covers the production deployment of the Astral Block Explorer indexing infrastructure for Autonomys Network.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Production Launch](#production-launch)
- [Service Management](#service-management)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

## Prerequisites

### System Requirements

- **OS**: Linux (Ubuntu 20.04+ recommended)
- **Docker**: v20.10+
- **Docker Compose**: v2.0+
- **Node.js**: v18.x or later
- **Yarn**: v2.x or later
- **Memory**: 32GB+ RAM recommended
- **Storage**: 500GB+ SSD recommended
- **Network**: Stable internet connection

### Infrastructure Dependencies

- PostgreSQL databases (main + staking)
- Redis instance
- Autonomys Network node access
- Sufficient disk space for blockchain data

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/autonomys/astral.git
cd astral
```

### 2. Environment Configuration

Create environment files from the sample:

```bash
# Create all environment files
for f in .env .env.dev .env.prod; do cp -v .env.sample "$f"; done
```

### 3. Configure Production Environment

Edit `.env` and `.env.prod` with your production settings:

**Key Configuration Variables:**

```bash
# Network Configuration
NETWORK_ID=mainnet
NODE_DOCKER_TAG=mainnet-2025-jan-14
CHAIN_ID="0x66455a580aabff303720aa83adbe6c44502922251c03ba73686d5245da9e21bd"

# RPC Configuration
RPC_URLS="ws://node:9944"

# Database Configuration
DB_USER=postgres
DB_PASSWORD=<your-secure-password>
DB_DATABASE=postgres
DB_HOST=postgres
DB_PORT=5432

# Staking Database
STAKING_DB_USER=postgres
STAKING_DB_PASSWORD=<your-secure-password>
STAKING_DB_DATABASE=staking
STAKING_DB_HOST=postgres-staking

# Indexing Start Blocks
START_BLOCK_CONSENSUS=1
START_BLOCK_STAKING=402000 #TAURUS starting block for staking
START_BLOCK_DOMAIN_AUTO_EVM=0

# Logging
LOG_LEVEL=info
ENABLE_DEBUG_LOGS=false

# Security
HASURA_GRAPHQL_ADMIN_SECRET="<your-admin-secret>"
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"<your-jwt-key>"}'

# Monitoring (Optional)
NR_API_KEY=<your-newrelic-key>
NR_AGENT_IDENTIFIER=<your-identifier>
```

### 4. Install Dependencies

```bash
cd indexers
yarn install
```

## Production Launch

### Method 1: Full Production Setup (Recommended)

This command handles code generation, building, and service launch:

```bash
cd indexers
yarn prod
```

**What this does:**

- ✅ Loads environment variables from `.env` and `.env.prod`
- ✅ Runs code generation (`lerna run codegen`)
- ✅ Builds all indexer projects (`lerna run build`)
- ✅ Launches all production services

### Method 2: Quick Launch (If Already Built)

If you've already built the projects and just need to start services:

```bash
cd indexers
yarn docker:prod:up
```

### Method 3: Direct Docker Compose

For manual control over the deployment:

```bash
docker compose -p prod-astral-indexers \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  -f docker-compose.workers.yml \
  --profile task --profile indexers \
  up -d --remove-orphans
```

## Service Management

### Check Service Status

```bash
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
```

### View Service Logs

```bash
# All services
docker compose -p prod-astral-indexers logs -f

# Specific service
docker logs prod-astral-indexers-consensus_subquery_node-1 -f
docker logs prod-astral-indexers-staking_subquery_node-1 -f
docker logs prod-astral-indexers-node-1 -f
```

### Stop Services

```bash
cd indexers
yarn docker:prod:down
```

### Restart Specific Services

```bash
# Restart indexers
docker restart prod-astral-indexers-consensus_subquery_node-1
docker restart prod-astral-indexers-staking_subquery_node-1
docker restart prod-astral-indexers-leaderboard_subquery_node-1
docker restart prod-astral-indexers-files_subquery_node-1

# Restart infrastructure
docker restart prod-astral-indexers-postgres-1
docker restart prod-astral-indexers-redis-1
docker restart prod-astral-indexers-hasura-1
```

## Deployed Services

The production deployment includes:

| Service                       | Port               | Description            |
| ----------------------------- | ------------------ | ---------------------- |
| **node**                      | 9944, 30333, 30433 | Autonomys Network node |
| **postgres**                  | 5432               | Main database          |
| **postgres-staking**          | 5433               | Staking database       |
| **redis**                     | 6379               | Cache and queues       |
| **hasura**                    | 8080               | GraphQL API            |
| **consensus_subquery_node**   | 3001               | Consensus indexer      |
| **leaderboard_subquery_node** | 3002               | Leaderboard indexer    |
| **staking_subquery_node**     | 3003               | Staking indexer        |
| **files_subquery_node**       | 3004               | Files indexer          |
| **taskboard**                 | 3020               | Task queue management  |
| **api**                       | 3030               | REST API               |
| **caddy**                     | 8000               | Reverse proxy          |

## Monitoring

### Health Checks

Check if all services are healthy:

```bash
docker ps --filter "health=unhealthy"
```

### Database Connections

```bash
# Main database
docker exec -it prod-astral-indexers-postgres-1 psql -U postgres -d postgres -c "SELECT count(*) FROM pg_stat_activity;"

# Staking database
docker exec -it prod-astral-indexers-postgres-staking-1 psql -U postgres -d staking -c "SELECT count(*) FROM pg_stat_activity;"
```

### Indexing Progress

```bash
# Check latest indexed blocks
docker logs prod-astral-indexers-consensus_subquery_node-1 --tail 10 | grep "Block:"
docker logs prod-astral-indexers-staking_subquery_node-1 --tail 10 | grep "Block:"
```

### System Resources

```bash
# Memory usage
docker stats --no-stream

# Disk usage
df -h
docker system df
```

## Troubleshooting

### Common Issues

#### 1. Services Not Starting

**Check logs:**

```bash
docker compose -p prod-astral-indexers logs
```

**Check dependencies:**

```bash
docker ps -a | grep -E "(postgres|redis|node)"
```

#### 2. Database Connection Issues

**Verify database is accessible:**

```bash
docker exec -it prod-astral-indexers-postgres-1 pg_isready
```

**Check database schemas:**

```bash
docker exec -it prod-astral-indexers-postgres-1 psql -U postgres -d postgres -c "\dn"
```

#### 3. Indexing Stopped or Slow

**Check node synchronization:**

```bash
docker logs prod-astral-indexers-node-1 --tail 20
```

**Verify RPC connectivity:**

```bash
docker exec -it prod-astral-indexers-consensus_subquery_node-1 curl -s http://node:9944/health
```

#### 4. Out of Memory Issues

**Increase shared memory for PostgreSQL:**

```bash
# Add to docker-compose override if needed
shm_size: 16g
```

**Monitor memory usage:**

```bash
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

### Reset and Clean Start

If you need to completely reset:

```bash
# Stop all services
cd indexers && yarn docker:prod:down

# Remove containers and volumes (⚠️ DATA LOSS)
docker compose -p prod-astral-indexers down -v

# Clean build and restart
yarn codegen && yarn build && yarn docker:prod:up
```

## Advanced Configuration

### Custom Start Blocks

To index from a specific block, update your `.env`:

```bash
START_BLOCK_CONSENSUS=1000
START_BLOCK_STAKING=402000
START_BLOCK_LEADERBOARD=1000
START_BLOCK_FILES=1000
```

### Performance Tuning

**Database Optimization:**

- Adjust `postgresql.conf` for your hardware
- Monitor connection pools
- Consider read replicas for high load

**Indexer Optimization:**

- Adjust batch sizes in docker-compose.yml
- Scale workers based on available CPU
- Monitor finality settings

### Backup Strategy

**Database Backup:**

```bash
# Backup main database
docker exec prod-astral-indexers-postgres-1 pg_dump -U postgres postgres > backup_main_$(date +%Y%m%d).sql

# Backup staking database
docker exec prod-astral-indexers-postgres-staking-1 pg_dump -U postgres staking > backup_staking_$(date +%Y%m%d).sql
```

**Volume Backup:**

```bash
# Backup node data
docker run --rm -v prod-astral-indexers_node-data:/data -v $(pwd):/backup alpine tar czf /backup/node_data_$(date +%Y%m%d).tar.gz -C /data .
```

## Support

For issues and support:

- **GitHub Issues**: [autonomys/astral/issues](https://github.com/autonomys/astral/issues)
- **Documentation**: [Main README](./README.md)
- **Indexers Guide**: [Indexers README](./indexers/README.md)

---

**⚠️ Security Notice:** Always use strong passwords, secure your environment files, and regularly update your system and Docker images.
