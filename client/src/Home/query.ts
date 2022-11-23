import { gql } from '@apollo/client'
// $accountTotal: BigInt!
export const QUERY_HOME_LISTS = gql`
  subscription HomeQuery($limit: Int!, $offset: Int!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      id
      hash
      height
      timestamp
      stateRoot
      blockchainSize
      spacePledged
      events(limit: 100) {
        id
      }
      extrinsics(limit: 100) {
        id
      }
    }
    # extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
    #   hash
    #   id
    #   success
    #   pos
    #   block {
    #     id
    #     height
    #     timestamp
    #   }
    #   name
    # }
    # accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {
    #   totalCount
    # }
    # extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {
    #   totalCount
    # }
  }
`
