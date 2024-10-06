import { gql } from '@apollo/client'

export const QUERY_EXTRINSICS = gql`
  query Extrinsics($limit: Int!, $offset: Int, $where: consensus_extrinsics_bool_exp) {
    consensus_extrinsics_aggregate(order_by: { id: desc }, where: $where) {
      aggregate {
        count
      }
    }
    consensus_extrinsics(order_by: { id: desc }, limit: $limit, offset: $offset, where: $where) {
      id
      hash
      block_height
      index_in_block
      success
      name
      nonce
      timestamp
    }
    consensus_extrinsic_modules(limit: 300) {
      method
    }
  }
`

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    consensus_extrinsics_by_pk(id: $extrinsicId) {
      index_in_block
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
      signer
      events(limit: 10) {
        id
        index_in_block
        phase
        index_in_block
        timestamp
        name
        args
        block {
          height
        }
        extrinsic {
          id
          index_in_block
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
    consensus_extrinsics(limit: 10, where: { hash: { _eq: $hash } }) {
      id
      hash
      index_in_block
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
