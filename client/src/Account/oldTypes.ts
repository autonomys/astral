import { Extrinsic, Maybe, Scalars } from 'gql/graphql'

export type OldAccount = {
  __typename?: 'Account'
  extrinsics: Array<Extrinsic>
  free?: Maybe<Scalars['BigInt']>
  id: Scalars['String']
  reserved?: Maybe<Scalars['BigInt']>
  total?: Maybe<Scalars['BigInt']>
  updatedAt?: Maybe<Scalars['BigInt']>
}
