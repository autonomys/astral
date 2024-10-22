import { gql } from '@apollo/client'

export const QUERY_LOGS = gql`
  query Logs($limit: Int!, $offset: Int, $where: consensus_logs_bool_exp) {
    consensus_logs_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_logs(order_by: { sort_id: desc }, limit: $limit, offset: $offset, where: $where) {
      id
      kind
      value
      block_height
      timestamp
    }
  }
`

export const QUERY_LOG_BY_ID = gql`
  query LogById($logId: String!) {
    consensus_logs_by_pk(id: $logId) {
      id
      kind
      value
      block_height
      timestamp
      block {
        id
        events(limit: 10, order_by: { sort_id: desc }) {
          id
          args
          name
          phase
          timestamp
          block_height
          extrinsic_id
        }
      }
    }
  }
`
