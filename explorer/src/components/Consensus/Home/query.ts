import { gql } from '@apollo/client'

export const QUERY_HOME = gql`
  query HomeQuery($limit: Int!, $offset: Int!) {
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
    consensus_extrinsics(limit: $limit, offset: $offset, order_by: { timestamp: desc }) {
      hash
      id
      success
      index_in_block
      timestamp
      block_height
      name
    }
    consensus_accounts_aggregate {
      aggregate {
        count
      }
    }
    accountsWithBalanceCount: consensus_accounts_aggregate(where: { total: { _gt: 1 } }) {
      aggregate {
        count
      }
    }
    consensus_extrinsics_aggregate {
      aggregate {
        count
      }
    }
    signedExtrinsics: consensus_extrinsics_aggregate(
      where: {
        signature: {
          _neq: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
