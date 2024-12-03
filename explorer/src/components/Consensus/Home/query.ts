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
    }
  }
`
