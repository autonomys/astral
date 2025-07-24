# Shared Blockchain Node

This directory contains a Docker Compose configuration for running a shared Autonomys blockchain node that can be used by both core and staking services.

## Quick Start

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Start the node:

   ```bash
   docker-compose up -d
   ```

3. Update your core/staking `.env` files to use the local node:
   ```bash
   RPC_URLS=ws://host.docker.internal:9944
   ```

## Configuration

The node runs with:

- Archive node (full history)
- RPC enabled on port 9944
- P2P on port 30333
- DSN on port 30433

## Usage with Core/Staking Services

By default, the core and staking services use public RPC endpoints. To use your local node:

1. Make sure the node is running and synced
2. Update the `RPC_URLS` in your `.env` files to point to `ws://host.docker.internal:9944`
3. Restart your services

This approach keeps the node completely separate and optional.
