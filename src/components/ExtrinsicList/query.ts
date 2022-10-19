import { gql } from '@apollo/client';

export const QUERY_EXTRINSIC_LIST = gql`
  {
    extrinsics(limit: 10, orderBy: block_height_DESC) {
      hash
    }
  }
`;
