import { gql } from '@apollo/client'

export const QUERY_BLOCKS = gql`
  query Blocks(
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_blocks_order_by!]!
    $where: consensus_blocks_bool_exp
  ) {
    consensus_blocks_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_blocks(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sortId: sort_id
      height
      hash
      timestamp
      parentHash: parent_hash
      specId: spec_id
      stateRoot: state_root
      extrinsicsRoot: extrinsics_root
      spacePledged: space_pledged
      blockchainSize: blockchain_size
      extrinsicsCount: extrinsics_count
      eventsCount: events_count
      authorId: author_id
    }
  }
`

export const QUERY_BLOCK_BY_ID = gql`
  query BlockById($blockId: String!, $blockHash: String!) {
    consensus_blocks(where: { _or: [{ id: { _eq: $blockId } }, { hash: { _eq: $blockHash } }] }) {
      id
      height
      hash
      state_root
      timestamp
      extrinsics_root
      spec_id
      parent_hash
      extrinsicsCount: extrinsics_count
      eventsCount: events_count
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
  query ExtrinsicsByBlockId(
    $blockId: numeric!
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_extrinsics_order_by!]
  ) {
    consensus_extrinsics(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: { block_height: { _eq: $blockId } }
    ) {
      id
      hash
      section
      module
      success
    }
  }
`

export const QUERY_BLOCK_EVENTS = gql`
  query EventsByBlockId(
    $blockId: numeric!
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_events_order_by!]
  ) {
    consensus_events(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: { block_height: { _eq: $blockId } }
    ) {
      id
      section
      module
      phase
      extrinsic_id
    }
  }
`
