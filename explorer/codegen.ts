import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultChain, squidLinks } from './src/constants/chains'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/rewardTypes.ts': {
      schema: squidLinks.rewards,
      documents: ['./src/**/rewardsQuery.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/oldSquidTypes.ts': {
      schema: defaultChain.urls.api,
      documents: ['./src/**/query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
