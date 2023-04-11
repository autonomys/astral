import { gql } from '@apollo/client'

export const QUERY_EXTRINSIC_LIST_CONNECTION = gql`
  query ExtrinsicsConnection($first: Int!, $after: String) {
    extrinsicsConnection(orderBy: block_height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          hash
          pos
          id
          success
          block {
            id
            timestamp
            height
          }
          name
          nonce
        }
      }
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
        startCursor
      }
      totalCount
    }
  }
`

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    extrinsicById(id: $extrinsicId) {
      pos
      id
      hash
      signature
      success
      tip
      args
      block {
        height
        id
        timestamp
      }
      signer {
        id
      }
      events(limit: 10) {
        id
        indexInBlock
        phase
        pos
        timestamp
        name
        args
        block {
          height
        }
        extrinsic {
          id
          pos
          block {
            height
          }
        }
      }
      name
    }
  }
`

export const QUERY_EXTRINSIC_BY_HASH = gql`
  query ExtrinsicsByHash($hash: String!) {
    extrinsics(limit: 10, where: { hash_eq: $hash }) {
      id
    }
  }
`
