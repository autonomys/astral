import { gql } from '@apollo/client'

export const LAST_BLOCK = gql`
  query LastBlock {
    lastBlock: consensus__metadata_by_pk(key: "lastProcessedHeight") {
      value
    }
  }
`
