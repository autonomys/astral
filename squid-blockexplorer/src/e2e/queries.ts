import { gql } from 'graphql-request';

export const queryBlocks = gql`
  query Blocks($height:BigInt) {
    blocks(limit: 1, where: {height_eq: $height}) {
      hash
      height
      id
      parentHash
      spacePledged
      specId
      stateRoot
      logs(limit: 100) {
        kind
      }
    }
  }
`;

export const queryExtrinsics = gql`
  query Extrinsics($height:BigInt) {
    extrinsics(where: {block: {height_eq: $height}}, limit: 1000) {
      hash
      name
    }
  }
`;

export const queryEvents = gql`
  query Events($height:BigInt) {
    events(where: {block: {height_eq: $height}}, limit: 1000) {
      name
    }
  }
`;

export const querySquidHeight = gql`
  query SquidHeight {
    squidStatus {
      height
    }
  }
`;

export const queryBalance = gql`
  query Balance($id: String!) {
    accountById(id: $id) {
      total
      free
      reserved
      updatedAt
    }
  }
`;
