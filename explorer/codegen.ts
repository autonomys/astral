import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultIndexer } from './src/constants/indexers'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/types.ts': {
      schema: defaultIndexer.indexer,
      documents: ['./src/**/query.ts'],
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
