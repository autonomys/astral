import { gql } from '@apollo/client'

export const QUERY_BLOCK_AND_EXTRINSIC_BY_HASH = gql`
  query BlocksAndExtrinsicByHash($hash: String!) {
    blocks(limit: 10, where: { hash_eq: $hash }) {
      id
      height
    }
    extrinsics(limit: 10, where: { hash_eq: $hash }) {
      id
    }
  }
`

export const GET_RESULTS = gql`
  query GetResults(
    $term: String!
    $blockId: numeric!
    $isAccount: Boolean!
    $isBlock: Boolean!
    $isBlockHash: Boolean!
    $isExtrinsic: Boolean!
    $isExtrinsicHash: Boolean!
    $isEvent: Boolean!
  ) {
    accountById: consensus_accounts(where: { id: { _eq: $term } }) @include(if: $isAccount) {
      id
    }
    blockById: consensus_blocks(limit: 1, where: { height: { _eq: $blockId } })
      @include(if: $isBlock) {
      height
    }
    blockByHash: consensus_blocks(limit: 1, where: { hash: { _eq: $term } })
      @include(if: $isBlockHash) {
      height
    }
    extrinsicById: consensus_extrinsics(where: { id: { _eq: $term } }) @include(if: $isExtrinsic) {
      id
      name
      block {
        height
      }
      index_in_block
      timestamp
    }
    extrinsics: consensus_extrinsics(limit: 1, where: { hash: { _eq: $term } })
      @include(if: $isExtrinsicHash) {
      id
    }
    eventById: consensus_events(where: { id: { _eq: $term } }) @include(if: $isEvent) {
      id
      name
      block {
        height
      }
      index_in_block
      timestamp
    }
  }
`
