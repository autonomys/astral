import { gql } from '@apollo/client'

export const QUERY_FILES = gql`
  query Files(
    $limit: Int!
    $offset: Int
    $orderBy: [files_files_order_by!]!
    $where: files_files_bool_exp
  ) {
    files_files_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    files_files(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      name
      cid {
        blockHeight: block_height
        extrinsicId: extrinsic_id
        timestamp
      }
    }
  }
`

export const QUERY_FILE_BY_ID = gql`
  query FileById($cid: String!) {
    files_files(where: { id: { _eq: $cid } }) {
      id
      name
      cid {
        blockHeight: block_height
        extrinsicId: extrinsic_id
        timestamp
        blockHash: block_hash
        extrinsicHash: extrinsic_hash
      }
    }
  }
`
