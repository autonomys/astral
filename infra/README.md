# Astral Infrastructure Deployment

This directory contains simplified deployment configurations for the Astral indexing infrastructure, separated into independent stacks.

## Structure

- **core/** - Core indexing services (consensus, files, API, Hasura)
- **staking/** - Staking-specific services (staking indexer, worker, dedicated database)
- **shared/** - Shared configurations and utilities
- **scripts/** - Helper scripts for deployment and operations

## Quick Start

### Deploy Core Services

```bash
cd core
make setup  # First time only
make start  # Start all core services
```

### Deploy Staking Services

```bash
cd staking
make setup  # First time only
make start  # Start all staking services
```

### Using the Deploy Script

```bash
# From project root
./deploy.sh start core      # Start core services
./deploy.sh start staking   # Start staking services
./deploy.sh start all       # Start everything
```

## Benefits

- **Simplified Commands**: From 50+ yarn scripts to ~12 intuitive commands
- **Independent Stacks**: Run and scale services independently
- **Clear Separation**: Core vs staking infrastructure
- **No Breaking Changes**: Existing project structure remains unchanged

## Requirements

- Docker & Docker Compose
- Make
- Node.js & Yarn (for building indexers)

See individual stack READMEs for detailed configuration.
