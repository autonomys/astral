# Staking Worker

A parallel worker to process staking updates for the SubQuery indexer.

## Structure

```
staking-worker/
├── src/
│   ├── services/
│   │   ├── autonomysService.ts  # Autonomys blockchain API connection
│   │   ├── dbService.ts         # Database operations
│   │   ├── redisService.ts      # Redis queue and caching
│   │   └── utils.ts            # Service utility functions
│   ├── config.ts               # Configuration management
│   ├── interfaces.ts           # TypeScript interfaces
│   ├── main.ts                # Application entry point
│   ├── utils.ts               # General utility functions
│   └── worker.ts              # Main worker logic
├── Dockerfile                 # Docker container configuration
├── package.json              # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Environment Variables

- `REDIS_HOST` - Redis server host
- `REDIS_PORT` - Redis server port
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `AUTONOMYS_API_ENDPOINT` - Autonomys blockchain WebSocket endpoint
- `BATCH_SIZE` - Number of tasks to process in each batch
- `QUEUE_PROCESSING_INTERVAL_MS` - Interval between queue processing runs