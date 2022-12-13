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
      # some blocks have more than 100 events
      events(limit: 200) {
        id
      }
      extrinsics(limit: 30) {
        id
      }
    }
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
    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {
      totalCount
    }
    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {
      totalCount
    }
  }
`
