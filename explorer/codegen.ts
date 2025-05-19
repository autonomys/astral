import type { CodegenConfig } from '@graphql-codegen/cli'
import { DEFAULT_INDEXER } from './src/constants/indexers'

const config: CodegenConfig = {
  generates: {
    './gql/graphql.tsx': {
      schema: DEFAULT_INDEXER,
      documents: ['./src/**/query.gql', './src/**/subscription.gql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
