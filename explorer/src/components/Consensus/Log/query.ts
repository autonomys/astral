import { gql } from '@apollo/client'

export const QUERY_LOG_CONNECTION_LIST = gql`
  query LogsConnection($limit: Int!, $offset: Int, $where: consensus_logs_bool_exp) {
    consensus_logs_aggregate(order_by: { id: desc }, where: $where) {
      aggregate {
        count
      }
    }
    consensus_logs(order_by: { id: desc }, limit: $limit, offset: $offset, where: $where) {
      id
      kind
      value
      block {
        id
        height
        timestamp
      }
    }
  }
`

export const QUERY_LOG_BY_ID = gql`
  query LogById($logId: String!) {
    consensus_logs_by_pk(id: $logId) {
      id
      kind
      value
      block {
        id
        height
        timestamp
        events(limit: 10, order_by: { id: desc }) {
          id
          args
          name
          phase
          index_in_block
          timestamp
          block {
            height
            hash
          }
        }
      }
    }
  }
`
