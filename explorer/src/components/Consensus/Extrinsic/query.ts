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
      events_aggregate {
        aggregate {
          count
        }
      }
      name
    }
  }
`

export const QUERY_EXTRINSIC_EVENTS = gql`
  query EventsByExtrinsicId(
    $extrinsicId: String!
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_events_order_by!]
  ) {
    consensus_events_aggregate(where: { extrinsic_id: { _eq: $extrinsicId } }) {
      aggregate {
        count
      }
    }
    consensus_events(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: { extrinsic_id: { _eq: $extrinsicId } }
    ) {
      id
      name
      phase
      index_in_block
      block_height
      extrinsic_id
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
