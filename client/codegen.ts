import * as dotenv from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

// chains
import chains from './src/layout/config/chains.json'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: chains[0].urls.api,
  documents: './src/**/*.{ts,tsx}',
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
