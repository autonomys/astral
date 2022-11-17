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
      name
    }
  }
`;

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    extrinsicById(id: $extrinsicId) {
      pos
      id
      hash
      signature
      success
      tip
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
      name
    }
  }
`;
