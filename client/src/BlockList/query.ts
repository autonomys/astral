import { gql } from "@apollo/client";

export const QUERY_BLOCK_LIST = gql`
  query Blocks($limit: Int!, $offset: Int!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      hash
      height
      timestamp
      validator
      stateRoot
      events {
        id
      }
      extrinsics {
        id
      }
    }
  }
`;
