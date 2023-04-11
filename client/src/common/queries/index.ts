import { gql } from '@apollo/client'

export const QUERY_BLOCK_AND_EXTRINSIC_BY_HASH = gql`
  query BlocksAndExtrinsicByHash($hash: String!) {
    blocks(limit: 10, where: { hash_eq: $hash }) {
      id
      height
    }
    extrinsics(limit: 10, where: { hash_eq: $hash }) {
      id
    }
  }
`
