import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    './gql/graphql.tsx': {
      schema: 'https://subql.blue.taurus.subspace.network/v1/graphql',
      documents: ['./src/**/query.gql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
