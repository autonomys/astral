import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";
import * as dotenv from "dotenv";
import path from "path";

// Load the appropriate .env file
const dotenvPath = path.resolve(__dirname, `../../../.env`);
dotenv.config({ path: dotenvPath });

console.log("env", process.env);

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "autonomys-gemini-3h-consensus",
  description: "Autonomys Gemini 3H Testnet - Consensus",
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId: process.env.GEMINI_3H_CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.GEMINI_3H_RPC!?.split(",") as string[] | string,
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Block,
            handler: "handleBlock",
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleCall",
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleEvent",
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;