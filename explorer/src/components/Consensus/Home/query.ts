import { gql } from '@apollo/client'

export const QUERY_HOME_CARDS = gql`
  query HomeCardsQuery {
    consensus_blocks(limit: 1, order_by: { sort_id: desc }) {
      height
      blockchain_size
      space_pledged
    }
    consensus_accounts_aggregate {
      aggregate {
        count
      }
    }
    consensus_extrinsics_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const QUERY_HOME_BLOCKS = gql`
  query HomeBlocksQuery($limit: Int!, $offset: Int!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
      id
      hash
      height
      timestamp
      state_root
      blockchain_size
      space_pledged
      extrinsics_count
      events_count
    }
  }
`

export const QUERY_HOME_EXTRINSICS = gql`
  query HomeExtrinsicsQuery($limit: Int!, $offset: Int!) {
    consensus_extrinsics(limit: $limit, offset: $offset, order_by: { timestamp: desc }) {
      hash
      id
      success
      index_in_block
      timestamp
      block_height
      name
    }
  }
`
