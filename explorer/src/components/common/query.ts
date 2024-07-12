import { gql } from '@apollo/client'

export const LAST_BLOCK = gql`
  query LastBlock {
    lastBlock: blocks(limit: 1, orderBy: height_DESC) {
      height
    }
  }
`
