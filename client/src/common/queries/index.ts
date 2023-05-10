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
    $blockId: BigInt!
    $isAccount: Boolean!
    $isBlock: Boolean!
    $isExtrinsic: Boolean!
    $isExtrinsicHash: Boolean!
    $isEvent: Boolean!
  ) {
    accountById(id: $term) @include(if: $isAccount) {
      id
    }
    blocks(limit: 1, where: { height_eq: $blockId }) @include(if: $isBlock) {
      height
    }
    extrinsicById(id: $term) @include(if: $isExtrinsic) {
      id
      name
      block {
        height
      }
      indexInBlock
      timestamp
    }
    extrinsics(limit: 1, where: { hash_eq: $term }) @include(if: $isExtrinsicHash) {
      id
    }
    eventById(id: $term) @include(if: $isEvent) {
      id
      name
      block {
        height
      }
      indexInBlock
      timestamp
    }
  }
`
