
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // TODO: don't forget to replace with https endpoint
  schema: "http://164.92.238.249:4444/graphql",
  documents: "./src/components/**/*.{ts,tsx}",
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
