
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://164.92.238.249:4444/graphql",
  documents: "./src/components/**/*.{ts,tsx}",
  generates: {
    "src/generated/graphql.tsx": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
