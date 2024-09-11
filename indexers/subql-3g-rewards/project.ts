import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

import * as dotenv from "dotenv";
import path from "path";

const mode = process.env.NODE_ENV || "production";

// Load the appropriate .env file
const dotenvPath = path.resolve(
  __dirname,
  `.env${mode !== "production" ? `.${mode}` : ""}`
);
dotenv.config({ path: dotenvPath });

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "gemini-3h-rewards",
  description: "Gemini 3H Testnet rewards",
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
    chainId: process.env.CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.ENDPOINT!?.split(",") as string[] | string,
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 0,
      endBlock: 1040169, // End of Gemini 3H campaign
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // Farmer
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleFarmerEvent",
            filter: {
              module: "rewards",
              method: "BlockReward",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleFarmerEvent",
            filter: {
              module: "rewards",
              method: "VoteReward",
            },
          },
          // Operator
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "DomainInstantiated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorSwitchedDomain",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorDeregistered",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "WithdrewStake",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorRegistered",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorNominated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorRewarded",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorEvent",
            filter: {
              module: "domains",
              method: "OperatorSlashed",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
