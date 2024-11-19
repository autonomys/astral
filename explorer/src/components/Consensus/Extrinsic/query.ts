import { gql } from '@apollo/client'

export const QUERY_EXTRINSICS = gql`
  query Extrinsics(
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_extrinsics_order_by!]!
    $where: consensus_extrinsics_bool_exp
  ) {
    consensus_extrinsics_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_extrinsics(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sortId: sort_id
      hash
      blockHeight: block_height
      blockHash: block_hash
      section
      module
      name
      indexInBlock: index_in_block
      success
      timestamp
      nonce
      signer
      signature
      tip
      fee
    }
    consensus_extrinsic_modules(limit: 300) {
      method
    }
  }
`

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    consensus_extrinsics(
      where: { _or: [{ id: { _eq: $extrinsicId } }, { hash: { _eq: $extrinsicId } }] }
    ) {
      id
      index_in_block
      hash
      block_height
      timestamp
      signature
      success
      tip
      args
      signer
      events(limit: 10) {
        id
        phase
        timestamp
        name
        args
        extrinsic_id
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
