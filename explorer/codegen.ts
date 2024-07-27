import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultChain } from './src/constants/chains'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/rewardTypes.ts': {
      schema: defaultChain.urls.squids.rewards,
      documents: ['./src/**/rewardsQuery.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/types/staking.ts': {
      schema: defaultChain.urls.squids.staking,
      documents: ['./src/**/query.staking.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/oldSquidTypes.ts': {
      schema: defaultChain.urls.squids.old,
      documents: ['./src/**/query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
