import { gql } from '@apollo/client';

export const QUERY_BLOCK_LIST = gql`
  {
    blocks(limit: 10, orderBy: height_DESC) {
      hash
      height
    }
  }
`;
