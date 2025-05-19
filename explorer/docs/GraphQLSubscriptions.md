# GraphQL Subscriptions Implementation

This document outlines the steps needed to implement GraphQL subscriptions in the Autonomys Explorer application to replace polling with real-time updates.

## Current Progress

The codebase has been prepared for subscriptions with the following changes:

1. **Apollo Client Configuration Updates**:

   - Added WebSocket link to the Apollo Client setup in `src/providers/IndexersProvider.tsx`
   - Implemented split link functionality to route operations based on type (queries vs subscriptions)

2. **Subscription Query Defined**:

   - Created subscription GQL definition in `src/components/Consensus/Home/subscription.gql`
   - This includes the same data as the existing query but as a subscription operation

3. **Consensus Home Component Updates**:
   - Modified the component to support subscriptions once they're available
   - Currently commented out the subscription code and kept the polling approach for compatibility

## Next Steps to Complete Implementation

1. **Ensure GraphQL Server Supports Subscriptions**:

   - The current GraphQL endpoint returns a 502 error when trying to access schema
   - Verify that the GraphQL server supports subscriptions (including WebSocket protocol)

2. **Update Codegen Configuration**:

   - Once the endpoint is working, run codegen to generate the subscription hooks
   - Current command: `yarn codegen`

3. **Enable Subscriptions in Components**:

   - Uncomment the subscription code in `src/components/Consensus/Home/index.tsx`
   - Import the generated subscription hook from `gql/graphql.tsx`
   - Replace polling with subscription for real-time updates

4. **Testing**:

   - Verify that subscriptions work correctly for the consensus module
   - Check for any performance issues or edge cases

5. **Roll Out to Other Modules**:
   - If consensus module implementation works successfully, apply the same pattern to other modules

## Implementation Details

### WebSocket Connection

The WebSocket URL is derived from the HTTP URL by replacing the protocol:

```typescript
// Convert http(s) to ws(s)
const wsUrl = indexerSet.indexer.replace(/^http/, 'ws')
```

### Subscription Example

Here's a subscription query example for the consensus data:

```graphql
subscription HomeSubscription($limit: Int!, $offset: Int!) {
  consensus_blocks(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
    id
    height
    timestamp
    extrinsics_count
    # other fields...
  }
  consensus_accounts_aggregate {
    aggregate {
      count
    }
  }
}
```

### Component Implementation Example

```typescript
// Import the generated hook
import { useHomeSubscription, useHomeQuery } from 'gql/graphql'

// In component:
const { data: subscriptionData, loading: subscriptionLoading } = useHomeSubscription({
  variables: { limit: PAGE_SIZE, offset: 0 },
  skip: !inView,
})

// Fallback to query if subscription fails
const { data: queryData, loading: queryLoading } = useHomeQuery({
  variables: { limit: PAGE_SIZE, offset: 0 },
  skip: !inView || !!subscriptionData,
  pollInterval: 6000,
})

// Use subscription data when available, fall back to query data
const data = subscriptionData || queryData
const loading = subscriptionLoading || queryLoading
```

## Troubleshooting

If subscriptions don't work:

1. Verify the GraphQL server supports subscriptions protocol
2. Check WebSocket connection in DevTools Network tab
3. Ensure the subscription operation matches the server's schema
4. Consider adding error handling specific to subscription failures
