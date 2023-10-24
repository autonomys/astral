import { gql } from '@apollo/client'

export const QUERY_EXTRINSIC_LIST_CONNECTION = gql`
  query ExtrinsicsConnection($first: Int!, $after: String, $where: ExtrinsicWhereInput) {
    extrinsicsConnection(orderBy: id_DESC, first: $first, after: $after, where: $where) {
      edges {
        cursor
        node {
          hash
          indexInBlock
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
    extrinsicModuleNames(limit: 300) {
      name
    }
  }
`

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    extrinsicById(id: $extrinsicId) {
      indexInBlock
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
        indexInBlock
        timestamp
        name
        args
        block {
          height
        }
        extrinsic {
          id
          indexInBlock
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
      hash
      indexInBlock
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
`
