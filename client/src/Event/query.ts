import { gql } from '@apollo/client'

export const QUERY_EVENT_LIST = gql`
  query Events($limit: Int!, $offset: Int!) {
    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
      name
      phase
      id
      block {
        height
        timestamp
      }
      indexInBlock
    }
  }
`

export const QUERY_EVENT_CONNECTION_LIST = gql`
  query EventsConnection($first: Int!, $after: String, $where: EventWhereInput) {
    eventsConnection(orderBy: id_DESC, first: $first, after: $after, where: $where) {
      edges {
        cursor
        node {
          args
          id
          indexInBlock
          name
          phase
          timestamp
          block {
            id
            timestamp
            height
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

export const QUERY_EVENT_BY_ID = gql`
  query EventById($eventId: String!) {
    eventById(id: $eventId) {
      args
      id
      indexInBlock
      name
      phase
      timestamp
      call {
        args
        name
        success
        timestamp
        id
      }
      extrinsic {
        args
        success
        tip
        fee
        id
        signer {
          id
        }
      }
      block {
        height
        id
        timestamp
        specId
        hash
      }
    }
  }
`
