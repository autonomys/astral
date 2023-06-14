import { gql } from '@apollo/client'

export const QUERY_BLOCK_LIST_CONNECTION = gql`
  query BlocksConnection($first: Int!, $after: String) {
    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          blockchainSize
          extrinsicsRoot
          hash
          height
          id
          parentHash
          spacePledged
          specId
          stateRoot
          timestamp
          events(limit: 10) {
            id
          }
          extrinsics(limit: 10) {
            id
          }
          author {
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

export const QUERY_BLOCK_LIST_CONNECTION_DOMAIN = gql`
  query BlocksConnectionDomain($first: Int!, $after: String) {
    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          extrinsicsRoot
          hash
          height
          id
          parentHash
          specId
          stateRoot
          timestamp
          events(limit: 10) {
            id
          }
          extrinsics(limit: 10) {
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
      extrinsicsRoot
      specId
      parentHash
      extrinsicsCount
      eventsCount
      logs(limit: 10, orderBy: block_height_DESC) {
        block {
          height
          timestamp
        }
        kind
        id
      }
      author {
        id
      }
    }
  }
`

export const QUERY_BLOCK_BY_ID_DOMAIN = gql`
  query BlockByIdDomain($blockId: BigInt!) {
    blocks(limit: 10, where: { height_eq: $blockId }) {
      id
      height
      hash
      stateRoot
      timestamp
      extrinsicsRoot
      specId
      parentHash
      extrinsicsCount
      eventsCount
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

export const QUERY_BLOCK_EXTRINSICS = gql`
  query ExtrinsicsByBlockId($blockId: BigInt!, $first: Int!, $after: String) {
    extrinsicsConnection(
      orderBy: indexInBlock_ASC
      first: $first
      after: $after
      where: { block: { height_eq: $blockId } }
    ) {
      edges {
        node {
          id
          hash
          name
          success
          block {
            height
            timestamp
          }
          indexInBlock
        }
        cursor
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`

export const QUERY_BLOCK_EVENTS = gql`
  query EventsByBlockId($blockId: BigInt!, $first: Int!, $after: String) {
    eventsConnection(
      orderBy: indexInBlock_ASC
      first: $first
      after: $after
      where: { block: { height_eq: $blockId } }
    ) {
      edges {
        node {
          id
          name
          phase
          indexInBlock
          block {
            height
            id
          }
          extrinsic {
            indexInBlock
            block {
              height
              id
            }
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

export const QUERY_BLOCK_BY_HASH = gql`
  query BlocksByHash($hash: String!) {
    blocks(limit: 10, where: { hash_eq: $hash }) {
      id
      height
    }
  }
`
