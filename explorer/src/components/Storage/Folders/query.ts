import { gql } from '@apollo/client'

export const QUERY_FOLDERS = gql`
  query Folders(
    $limit: Int!
    $offset: Int
    $orderBy: [files_folders_order_by!]!
    $where: files_folders_bool_exp
  ) {
    files_folders_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    files_folders(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
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

export const QUERY_FOLDER_BY_ID = gql`
  query FolderById($cid: String!) {
    files_folders(where: { id: { _eq: $cid } }) {
      id
      name
      cid {
        blockHeight: block_height
        extrinsicId: extrinsic_id
        timestamp
        blockHash: block_hash
        extrinsicHash: extrinsic_hash
      }
      childCount: folder_cids_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const QUERY_FOLDER_CHILDREN_BY_ID = gql`
  query FolderChildrenById(
    $cid: String!
    $limit: Int!
    $offset: Int
    $orderBy: [files_folder_cids_order_by!]
  ) {
    files_folder_cids_aggregate(
      where: { parent_cid: { _eq: $cid }, chunk: { type: { _eq: "File" } } }
    ) {
      aggregate {
        count
      }
    }
    files_folder_cids(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: { parent_cid: { _eq: $cid }, chunk: { type: { _eq: "File" } } }
    ) {
      child_cid
      chunk {
        name
      }
    }
  }
`
