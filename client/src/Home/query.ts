import { gql } from '@apollo/client'

export const QUERY_HOME = gql`
  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: BigInt!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      id
      hash
      height
      timestamp
      stateRoot
      blockchainSize
      spacePledged
      extrinsicsCount
      eventsCount
    }
    extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
      hash
      id
      success
      indexInBlock
      timestamp
      block {
        id
        height
      }
      name
    }
    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {
      totalCount
    }
    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {
      totalCount
    }
  }
`

export const QUERY_HOME_DOMAIN = gql`
  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: BigInt!) {
    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {
      id
      hash
      height
      timestamp
      stateRoot
      extrinsicsCount
      eventsCount
    }
    extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
      hash
      id
      success
      indexInBlock
      timestamp
      block {
        id
        height
      }
      name
    }
    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {
      totalCount
    }
    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {
      totalCount
    }
  }
`
