import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  generates: {
    './gql/graphql.tsx': {
      schema: 'https://subql.green.taurus.subspace.network/v1/graphql',
      documents: ['./src/**/query.gql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
