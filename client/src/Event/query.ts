import { gql } from "@apollo/client";

export const QUERY_EVENT_LIST = gql`
  query Events($limit: Int!, $offset: Int!) {
    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
      name
      phase
      pos
      id
      block {
        height
        timestamp
      }
      indexInBlock
    }
  }
`;
