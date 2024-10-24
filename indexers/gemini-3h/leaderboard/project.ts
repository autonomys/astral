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
console.log("endpoint", process.env.GEMINI_3H_RPC);

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "autonomys-gemini-3h-leaderboard",
  description: "Autonomys Gemini 3H Testnet - Leaderboard",
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
    dictionary: process.env.DICTIONARY!,
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // accounts
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleTransferEvent",
            filter: {
              module: "balances",
              method: "Transfer",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleRemarkEvent",
            filter: {
              module: "system",
              method: "Remarked",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleExtrinsicSuccessEvent",
            filter: {
              module: "system",
              method: "ExtrinsicSuccess",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleExtrinsicFailedEvent",
            filter: {
              module: "system",
              method: "ExtrinsicFailed",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleTransactionFeePaidEvent",
            filter: {
              module: "transactionPayment",
              method: "TransactionFeePaid",
            },
          },
          // farmers
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleFarmerVoteRewardEvent",
            filter: {
              module: "rewards",
              method: "VoteReward",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleFarmerBlockRewardEvent",
            filter: {
              module: "rewards",
              method: "BlockReward",
            },
          },
          // operators & nominators
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorRewardedEvent",
            filter: {
              module: "domains",
              method: "OperatorRewarded",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorTaxCollectedEvent",
            filter: {
              module: "domains",
              method: "OperatorTaxCollected",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleBundleStoredEvent",
            filter: {
              module: "domains",
              method: "BundleStored",
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
            handler: "handleWithdrewStakeEvent",
            filter: {
              module: "domains",
              method: "WithdrewStake",
            },
          },
          {
            kind: SubstrateHandlerKind.Block,
            handler: "handleSortAndRankLeaderboard",
            filter: {
              // This is the frequency of the leaderboard sort and rank
              modulo: 50,
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
