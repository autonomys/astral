import { gql } from '@apollo/client'

export const QUERY_EVENTS = gql`
  query Events($limit: Int!, $offset: Int, $where: consensus_events_bool_exp) {
    consensus_events_aggregate(order_by: { id: desc }, where: $where) {
      aggregate {
        count
      }
    }
    consensus_events(order_by: { id: desc }, limit: $limit, offset: $offset, where: $where) {
      args
      id
      index_in_block
      name
      phase
      timestamp
      block {
        id
        timestamp
        height
      }
    }
    consensus_event_modules(limit: 300) {
      id
    }
  }
`

export const QUERY_EVENT_BY_ID = gql`
  query EventById($eventId: String!) {
    consensus_events_by_pk(id: $eventId) {
      args
      id
      index_in_block
      name
      phase
      timestamp
      #  call {
      #    args
      #    name
      #    success
      #    timestamp
      #    id
      #  }
      extrinsic {
        args
        success
        tip
        fee
        id
        signer
      }
      block {
        height
        id
        timestamp
        spec_id
        hash
      }
    }
  }
`
