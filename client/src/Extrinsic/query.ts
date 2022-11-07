import { gql } from "@apollo/client";

export const QUERY_EXTRINSIC_LIST = gql`
  query Extrinsics($limit: Int!, $offset: Int!) {
    extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
      hash
      id
      success
      pos
      block {
        height
        timestamp
      }
      call {
        name
      }
    }
  }
`;

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($blockId: Int!, $pos: Int!) {
    extrinsics(where: { block: { height_eq: $blockId }, pos_eq: $pos }) {
      pos
      id
      hash
      signature
      success
      tip
      version
      block {
        height
        id
        events(limit: 10) {
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
        timestamp
      }
      call {
        name
      }
    }
  }
`;
