import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
import { defaultIndexer } from './src/constants/indexers'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/graphql.tsx': {
      schema: defaultIndexer.indexer,
      documents: ['./src/**/query.gql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
