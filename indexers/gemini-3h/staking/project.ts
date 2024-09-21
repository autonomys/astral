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
  name: "autonomys-gemini-3h-staking",
  description: "Autonomys Gemini 3H Testnet - Staking",
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
      startBlock: 316220,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleRegisterOperatorCall",
            filter: {
              module: "domains",
              method: "registerOperator",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleNominateOperatorCall",
            filter: {
              module: "domains",
              method: "NominateOperator",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleDeregisterOperatorCall",
            filter: {
              module: "domains",
              method: "DeregisterOperator",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleWithdrawStakeCall",
            filter: {
              module: "domains",
              method: "WithdrawStake",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleUnlockFundsCall",
            filter: {
              module: "domains",
              method: "UnlockFunds",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleUnlockOperatorCall",
            filter: {
              module: "domains",
              method: "UnlockOperator",
            },
          },
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleUnlockNominatorCall",
            filter: {
              module: "domains",
              method: "UnlockNominator",
            },
          },
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
            handler: "handleDomainEpochCompletedEvent",
            filter: {
              module: "domains",
              method: "DomainEpochCompleted",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleForceDomainEpochTransitionEvent",
            filter: {
              module: "domains",
              method: "ForceDomainEpochTransition",
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
            handler: "handleOperatorDeregisteredEvent",
            filter: {
              module: "domains",
              method: "OperatorDeregistered",
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
            kind: SubstrateHandlerKind.Event,
            handler: "handleStorageFeeDepositedEvent",
            filter: {
              module: "domains",
              method: "StorageFeeDeposited",
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
            handler: "handleOperatorUnlockedEvent",
            filter: {
              module: "domains",
              method: "OperatorUnlocked",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleFundsUnlockedEvent",
            filter: {
              module: "domains",
              method: "FundsUnlocked",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleNominatedStakedUnlockedEvent",
            filter: {
              module: "domains",
              method: "NominatedStakedUnlocked",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleNominatorUnlockedEvent",
            filter: {
              module: "domains",
              method: "NominatorUnlocked",
            },
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleStorageFeeUnlockedEvent",
            filter: {
              module: "domains",
              method: "StorageFeeUnlocked",
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
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleOperatorSlashedEvent",
            filter: {
              module: "domains",
              method: "OperatorSlashed",
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
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
