import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultChain } from './src/constants/chains'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: [defaultChain.urls.api],
  documents: ['./src/**/*.{ts,tsx}', '!./src/components/StakeWars/query.ts'],
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
