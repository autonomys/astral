import { gql } from '@apollo/client'

export const QUERY_HOME_CARDS = gql`
  query HomeCardsQuery {
    consensus_blocks(limit: 1, order_by: { sort_id: desc }) {
      height
      blockchain_size
      space_pledged
    }
  }
`

export const QUERY_HOME_BLOCKS = gql`
  query HomeBlocksQuery($limit: Int!, $offset: Int!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
      id
      height
      timestamp
      extrinsics_count
      events_count
    }
  }
`

export const QUERY_HOME_EXTRINSICS = gql`
  query HomeExtrinsicsQuery($limit: Int!, $offset: Int!) {
    consensus_extrinsics(limit: $limit, offset: $offset, order_by: { timestamp: desc }) {
      id
      hash
      block_height
      name
      timestamp
      success
    }
  }
`
