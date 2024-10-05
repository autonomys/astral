import { gql } from '@apollo/client'

export const LAST_BLOCK = gql`
  query LastBlock {
    lastBlock: consensus_blocks(limit: 1, order_by: { height: desc }) {
      height
    }
  }
`
