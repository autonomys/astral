import { gql } from '@apollo/client'

export const QUERY_HOME = gql`
  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: numeric!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {
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
    accounts_accounts_aggregate(order_by: { id: asc }, where: { total: { _gt: $accountTotal } }) {
      aggregate {
        count
      }
    }
    consensus_extrinsics_aggregate(
      order_by: { id: asc }
      where: { signature: { _is_null: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`
