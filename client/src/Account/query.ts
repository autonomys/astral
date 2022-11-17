import { gql } from "@apollo/client";

export const QUERY_ACCOUNT_LIST = gql`
  query Account($limit: Int!, $offset: Int!) {
    accounts(limit: $limit, offset: $offset, orderBy: total_DESC) {
      free
      id
      reserved
      total
      updatedAt
      extrinsics(limit: 100) {
        id
      }
    }
  }
`;

export const QUERY_ACCOUNT_BY_ID = gql`
  query AccountById($accountId: String!) {
    accountById(id: $accountId) {
      free
      reserved
      id
      total
      updatedAt
      extrinsics(limit: 10) {
        hash
        id
        block {
          height
        }
        pos
        name
        success
        timestamp
        tip
      }
    }
  }
`;
