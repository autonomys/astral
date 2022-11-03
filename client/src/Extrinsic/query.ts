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
