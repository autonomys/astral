import { gql } from '@apollo/client'

export const QUERY_BLOCK_LIST_CONNECTION = gql`
  query BlocksConnection($first: Int!, $after: String) {
    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          blockchainSize
          extrinsicRoot
          hash
          height
          id
          parentHash
          spacePledged
          specId
          stateRoot
          timestamp
          events(limit: 300) {
            id
          }
          extrinsics(limit: 300) {
            id
          }
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

export const QUERY_BLOCK_BY_ID = gql`
  query BlockById($blockId: BigInt!) {
    blocks(limit: 10, where: { height_eq: $blockId }) {
      id
      height
      hash
      stateRoot
      timestamp
      extrinsicRoot
      specId
      parentHash
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        id
        hash
        name
        block {
          height
          timestamp
        }
        pos
      }
      events(limit: 10, orderBy: block_height_DESC) {
        id
        name
        phase
        pos
        block {
          height
          id
        }
        extrinsic {
          pos
          block {
            height
            id
          }
        }
      }
      logs(limit: 10, orderBy: block_height_DESC) {
        block {
          height
          timestamp
        }
        kind
        id
      }
    }
  }
`
