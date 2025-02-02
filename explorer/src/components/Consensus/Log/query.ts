import { gql } from '@apollo/client'

export const QUERY_LOGS = gql`
  query Logs(
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_logs_order_by!]!
    $where: consensus_logs_bool_exp
  ) {
    consensus_logs_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_logs(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sortId: sort_id
      blockHeight: block_height
      blockHash: block_hash
      indexInBlock: index_in_block
      kind
      timestamp
    }
  }
`

export const QUERY_LOG_BY_ID = gql`
  query LogById($logId: String!) {
    consensus_logs(where: { id: { _eq: $logId } }) {
      id
      kind
      value
      block_height
    }
  }
`
