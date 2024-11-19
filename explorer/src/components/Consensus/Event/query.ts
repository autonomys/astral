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
      name
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
