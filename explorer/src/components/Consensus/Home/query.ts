import { gql } from '@apollo/client'

export const QUERY_HOME = gql`
  query Home($limit: Int!, $offset: Int!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
      id
      height
      timestamp
      extrinsics_count
      events_count
      space_pledged
      blockchain_size
      extrinsicsCount: extrinsics_count
      extrinsics(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
        id
        hash
        block_height
        name
        timestamp
        success
      }
      cumulative {
        cumulative_extrinsics_count
        cumulative_events_count
        cumulative_transfers_count
        cumulative_transfer_value
        cumulative_rewards_count
        cumulative_reward_value
      }
    }
    consensus_accounts_aggregate {
      aggregate {
        count
      }
    }
  }
`
