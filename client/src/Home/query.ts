import { gql } from '@apollo/client'
// $accountTotal: BigInt!
export const QUERY_BLOCK_LISTS = gql`
  subscription BlockQuery($limit: Int!, $offset: Int!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      id
      hash
      height
      timestamp
      stateRoot
      blockchainSize
      spacePledged
      events(limit: 300) {
        id
      }
      extrinsics(limit: 300) {
        id
      }
    }
  }
`

export const QUERY_EXTRINSIC_LISTS = gql`
  subscription ExtrinsicQuery($limit: Int!, $offset: Int!) {
    extrinsics(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
      hash
      id
      success
      pos
      block {
        id
        height
        timestamp
      }
      name
    }
  }
`

export const QUERY_HOME_LISTS = gql`
  query HomeQuery($accountTotal: BigInt!) {
    blocks(limit: 1, offset: 0, orderBy: height_DESC) {
      id
      hash
      height
      timestamp
      stateRoot
      blockchainSize
      spacePledged
    }
    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {
      totalCount
    }
    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {
      totalCount
    }
  }
`
