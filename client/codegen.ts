import * as dotenv from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPHQL_API_URL,
  documents: './src/**/*.{ts,tsx}',
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
