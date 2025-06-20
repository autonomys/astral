import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    './gql/graphql.tsx': {
      schema: 'https://subql.green.taurus.subspace.network/v1/graphql',
      documents: ['./src/**/query.gql', './src/**/subscription.gql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withSubscriptionHooks: true,
      },
    },
  },
}

export default config
