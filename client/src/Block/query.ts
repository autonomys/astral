import { gql } from "@apollo/client";

export const QUERY_BLOCK_LIST = gql`
  query Blocks($limit: Int!, $offset: Int!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      hash
      height
      timestamp
      stateRoot
      blockchainSize
      spacePledged
      events(limit: 100) {
        id
      }
      extrinsics(limit: 100) {
        id
      }
    }
  }
`;

export const QUERY_BLOCK_BY_ID = gql`
  query BlockById($blockId: BigInt!) {
    blocks(limit: 10, where: { height_eq: $blockId }) {
      id
      height
      hash
      stateRoot
      timestamp
      extrinsicRoot
      specId
      parentHash
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        id
        hash
        name
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
`;
