# GraphQL Subscription Demo Guide

This guide will help you set up and test real-time GraphQL subscriptions for the Astral Explorer.

## Setup Instructions

### 1. Start the Local Environment

First, make sure Docker is running and start the local database and Hasura:

```bash
# Navigate to astral directory
cd /Users/namananand/Desktop/autonomys/astral

# Stop any running containers
docker-compose down

# Start just the database and Hasura
docker-compose up -d postgres hasura
```

### 2. Set up Test Tables

Create test tables for subscriptions and populate with initial data:

```bash
# Execute the SQL scripts to create tables
docker exec -i astral-postgres-1 psql -U postgres -d postgres -c "
CREATE TABLE IF NOT EXISTS consensus_blocks (
    id VARCHAR PRIMARY KEY,
    height BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    extrinsics_count INTEGER NOT NULL DEFAULT 0,
    events_count INTEGER NOT NULL DEFAULT 0,
    space_pledged BIGINT NOT NULL DEFAULT 0,
    blockchain_size BIGINT NOT NULL DEFAULT 0,
    sort_id VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS consensus_accounts_aggregate (
    id VARCHAR PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS consensus__metadata (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS block_generator (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION add_test_block() RETURNS TRIGGER AS $$
DECLARE
  next_height BIGINT;
  next_sort_id VARCHAR;
BEGIN
  SELECT COALESCE(MAX(height), 0) + 1 INTO next_height FROM consensus_blocks;
  next_sort_id := LPAD(next_height::TEXT, 6, '0');

  INSERT INTO consensus_blocks (
    id,
    height,
    timestamp,
    extrinsics_count,
    events_count,
    space_pledged,
    blockchain_size,
    sort_id
  )
  VALUES (
    'block-' || next_height,
    next_height,
    NOW(),
    floor(random() * 10)::INTEGER,
    floor(random() * 20)::INTEGER,
    10000 + (next_height * 1000),
    50000 + (next_height * 1000),
    next_sort_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_block_trigger
AFTER INSERT ON block_generator
FOR EACH ROW
EXECUTE FUNCTION add_test_block();
"

# Insert initial data
docker exec -i astral-postgres-1 psql -U postgres -d postgres -c "
INSERT INTO consensus_accounts_aggregate (id, count) VALUES ('accounts', 100);
INSERT INTO consensus__metadata (key, value) VALUES ('lastProcessedHeight', '\"100\"');

-- Insert some test blocks
INSERT INTO consensus_blocks (id, height, timestamp, extrinsics_count, events_count, space_pledged, blockchain_size, sort_id)
VALUES
('block-1', 1, NOW() - INTERVAL '10 minutes', 5, 10, 10000, 50000, '000001'),
('block-2', 2, NOW() - INTERVAL '9 minutes', 3, 7, 11000, 51000, '000002'),
('block-3', 3, NOW() - INTERVAL '8 minutes', 6, 12, 12000, 52000, '000003'),
('block-4', 4, NOW() - INTERVAL '7 minutes', 4, 9, 13000, 53000, '000004'),
('block-5', 5, NOW() - INTERVAL '6 minutes', 7, 14, 14000, 54000, '000005');
"
```

### 3. Register Tables with Hasura

Make the tables available through GraphQL:

```bash
# Track tables in Hasura
curl -d'{"type":"pg_track_table","args":{"source":"default","table":{"schema":"public","name":"consensus_blocks"}}}' \
  http://localhost:8080/v1/metadata -H "Content-Type: application/json" -H "X-Hasura-Admin-Secret: helloworld"

curl -d'{"type":"pg_track_table","args":{"source":"default","table":{"schema":"public","name":"consensus_accounts_aggregate"}}}' \
  http://localhost:8080/v1/metadata -H "Content-Type: application/json" -H "X-Hasura-Admin-Secret: helloworld"

curl -d'{"type":"pg_track_table","args":{"source":"default","table":{"schema":"public","name":"consensus__metadata"}}}' \
  http://localhost:8080/v1/metadata -H "Content-Type: application/json" -H "X-Hasura-Admin-Secret: helloworld"

curl -d'{"type":"pg_track_table","args":{"source":"default","table":{"schema":"public","name":"block_generator"}}}' \
  http://localhost:8080/v1/metadata -H "Content-Type: application/json" -H "X-Hasura-Admin-Secret: helloworld"
```

### 4. Start the Block Generator

To simulate real-time data for testing subscriptions:

```bash
# Install node-fetch if needed
npm install node-fetch

# Start the block generator
node generate-blocks.js
```

This script will generate new blocks every 5 seconds, triggering subscriptions.

### 5. Start the Explorer App

In a new terminal:

```bash
# Navigate to explorer directory
cd /Users/namananand/Desktop/autonomys/astral/explorer

# Start the development server
npm run dev
```

### 6. Test the Subscription Demo

Visit [http://localhost:3000/subscription-demo](http://localhost:3000/subscription-demo) to see the subscription in action.

## Understanding How It Works

1. **WebSocket Connection**: The demo establishes a WebSocket connection to the GraphQL server.
2. **Subscription Query**: It subscribes to changes in the `consensus_blocks` table.
3. **Real-time Updates**: When new blocks are generated, updates are pushed automatically to the client.
4. **Rendering**: React components re-render with the latest data without page refreshes.

## Implementing in Your Application

To add GraphQL subscriptions to other parts of the application:

1. **Update Apollo Client**: The setup in `src/providers/IndexersProvider.tsx` already supports subscriptions.
2. **Create Subscription Queries**: Define your subscription queries in .gql files.
3. **Use useSubscription Hook**: Replace polling with the `useSubscription` hook.
4. **Add Fallback Logic**: Provide fallbacks to regular queries if subscriptions fail.

Example:

```tsx
// 1. Define subscription
const MY_SUBSCRIPTION = gql`
  subscription MySubscription($limit: Int!) {
    some_table(limit: $limit) {
      id
      field1
      field2
    }
  }
`

// 2. Use in component
const { data: subData, loading: subLoading } = useSubscription(MY_SUBSCRIPTION, {
  variables: { limit: 10 },
})

// 3. Add fallback
const { data: queryData, loading: queryLoading } = useQuery(MY_QUERY, {
  variables: { limit: 10 },
  skip: !!subData,
  pollInterval: 6000,
})

// 4. Use data
const data = subData || queryData
```

## Troubleshooting

- **No data appears**: Check if block generator is running and tables are correctly tracked
- **WebSocket errors**: Check browser console for connection issues
- **Schema errors**: Ensure the schema matches what your queries expect
- **Hasura console**: Visit [http://localhost:8080/console](http://localhost:8080/console) to test queries directly

## Next Steps

1. Test with production schema
2. Update one module at a time
3. Add proper error handling
4. Monitor performance impact
