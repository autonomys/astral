import * as dotenv from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

// domains
import domains from './src/layout/config/domain.json'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: domains[0].urls.api,
  documents: './src/**/*.{ts,tsx}',
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
