import { gql } from '@apollo/client'

export const QUERY_EVENTS = gql`
  query Events(
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_events_order_by!]!
    $where: consensus_events_bool_exp
  ) {
    consensus_events_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_events(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sortId: sort_id
      blockHeight: block_height
      blockHash: block_hash
      extrinsicId: extrinsic_id
      extrinsicHash: extrinsic_hash
      section
      module
      indexInBlock: index_in_block
      timestamp
      phase
    }
    consensus_event_modules(limit: 300) {
      method
    }
  }
`

export const QUERY_EVENT_BY_ID = gql`
  query EventById($eventId: String!) {
    consensus_events(where: { id: { _eq: $eventId } }) {
      id
      extrinsicId: extrinsic_id
      blockHeight: block_height
      section
      module
      timestamp
      args
    }
  }
`
