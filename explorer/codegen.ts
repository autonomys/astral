import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultIndexer } from './src/constants/indexers'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/types/leaderboard.ts': {
      schema: defaultIndexer.squids.leaderboard,
      documents: ['./src/**/leaderboard.query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/types/staking.ts': {
      schema: defaultIndexer.squids.staking,
      documents: ['./src/**/staking.query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/rewardTypes.ts': {
      schema: defaultIndexer.squids.rewards,
      documents: ['./src/**/rewardsQuery.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
    './gql/oldSquidTypes.ts': {
      schema: defaultIndexer.squids.old,
      documents: ['./src/**/query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
