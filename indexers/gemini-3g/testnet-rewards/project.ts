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

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "autonomys-gemini-3g-testnet-rewards",
  description: "Autonomys Gemini 3G Testnet - Testnet Rewards",
  repository: "https://github.com/autonomys/astral",
  runner: {
    node: {
      name: "@subql/node",
      version: "*",
      options: {
        historical: true,
        unsafe: false,
        unfinalizedBlocks: false,
        skipTransactions: false,
      },
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
    chainId: process.env.GEMINI_3G_CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.GEMINI_3G_RPC!?.split(",") as string[] | string,
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      //  startBlock: 1,
      startBlock: 102535, // 1st: DomainInstantiated
      //  startBlock: 102891, // 1st: OperatorRegistered
      //  startBlock: 119859, // 1st: OperatorNominated
      //  startBlock: 129241, // 1st: OperatorDeregistered
      //  startBlock: 144368, // 1st: WithdrewStake
      //  endBlock: 1040169, // End of Gemixni 3G campaign
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // initial data
          {
            kind: SubstrateHandlerKind.Block,
            handler: "handleBlock",
            filter: {
              modulo: 100,
            },
          },
          // accounts
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
            handler: "handleDomainInstantiatedEvent",
            filter: {
              module: "domains",
              method: "DomainInstantiated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorDeregisteredEvent",
            filter: {
              module: "domains",
              method: "OperatorDeregistered",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleWithdrewStakeEvent",
            filter: {
              module: "domains",
              method: "WithdrewStake",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorRegisteredEvent",
            filter: {
              module: "domains",
              method: "OperatorRegistered",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorNominatedEvent",
            filter: {
              module: "domains",
              method: "OperatorNominated",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorRewardedEvent",
            filter: {
              module: "domains",
              method: "OperatorRewarded",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
