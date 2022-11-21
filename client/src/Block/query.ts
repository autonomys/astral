import { gql } from '@apollo/client'

export const QUERY_BLOCK_LIST = gql`
  query Blocks($limit: Int!, $offset: Int!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      hash
      height
      timestamp
      validator
      stateRoot
      events {
        id
      }
      extrinsics {
        id
      }
    }
  }
`

export const QUERY_BLOCK_BY_ID = gql`
  query BlockById($blockId: Int!) {
    blocks(where: { height_eq: $blockId }) {
      id
      height
      hash
      stateRoot
      timestamp
      validator
      extrinsicsRoot
      spec {
        specVersion
      }
      parentHash
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        id
        hash
        call {
          name
        }
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
    }
  }
`
