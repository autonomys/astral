import { gql } from '@apollo/client'

export const QUERY_BLOCKS = gql`
  query Blocks($limit: Int!, $offset: Int, $orderBy: [consensus_blocks_order_by!]!) {
    consensus_blocks_aggregate {
      aggregate {
        count
      }
    }
    consensus_blocks(order_by: $orderBy, limit: $limit, offset: $offset) {
      blockchain_size
      extrinsics_root
      hash
      height
      id
      parent_hash
      space_pledged
      spec_id
      state_root
      timestamp
      events(limit: 10) {
        id
      }
      extrinsics(limit: 10) {
        id
      }
      author_id
    }
  }
`

export const QUERY_BLOCK_BY_ID = gql`
  query BlockById($blockId: numeric!, $blockHash: String!) {
    consensus_blocks(
      where: { _or: [{ height: { _eq: $blockId } }, { hash: { _eq: $blockHash } }] }
    ) {
      id
      height
      hash
      state_root
      timestamp
      extrinsics_root
      spec_id
      parent_hash
      extrinsics_count
      events_count
      logs(limit: 10, order_by: { block_height: desc }) {
        block_height
        block {
          timestamp
        }
        kind
        id
      }
      author_id
    }
  }
`

export const QUERY_BLOCK_EXTRINSICS = gql`
  query ExtrinsicsByBlockId($blockId: numeric!, $limit: Int!, $offset: Int) {
    consensus_extrinsics_aggregate(where: { block_height: { _eq: $blockId } }) {
      aggregate {
        count
      }
    }
    consensus_extrinsics(
      order_by: { index_in_block: asc }
      limit: $limit
      offset: $offset
      where: { block_height: { _eq: $blockId } }
    ) {
      id
      hash
      name
      success
      block_height
      timestamp
      index_in_block
    }
  }
`

export const QUERY_BLOCK_EVENTS = gql`
  query EventsByBlockId($blockId: numeric!, $limit: Int!, $offset: Int) {
    consensus_events_aggregate(where: { block_height: { _eq: $blockId } }) {
      aggregate {
        count
      }
    }
    consensus_events(
      order_by: { index_in_block: asc }
      limit: $limit
      offset: $offset
      where: { block_height: { _eq: $blockId } }
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

export const QUERY_BLOCK_BY_HASH = gql`
  query BlocksByHash($hash: String!) {
    consensus_blocks(limit: 10, where: { hash: { _eq: $hash } }) {
      id
      height
    }
  }
`
