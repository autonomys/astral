import {
  BlockHeader,
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Call as _Call,
  Event as _Event,
  Extrinsic as _Extrinsic,
} from "@subsquid/substrate-processor";
import { assertNotNull } from "@subsquid/util-internal";

import { calls, events } from "./types";

export const processor = new SubstrateBatchProcessor()
  // .setGateway('')
  .setRpcEndpoint({
    // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
    // https://docs.subsquid.io/deploy-squid/env-variables/
    url: assertNotNull(
      process.env.RPC_CONSENSUS_HTTP,
      "No RPC endpoint supplied"
    ),
    // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
    rateLimit: 10,
  })
  .addCall({
    name: [
      // operator and nomination
      calls.domains.registerOperator.name,
      calls.domains.nominateOperator.name,
      calls.domains.deregisterOperator.name,
      // deposit and stake
      calls.domains.withdrawStake.name,
      calls.domains.unlockFunds.name,
      calls.domains.unlockOperator.name,
      calls.domains.unlockNominator.name,
    ],

    events: true,
    extrinsic: true,
  })
  .addEvent({
    name: [
      // new domain
      events.domains.domainInstantiated.name,
      // epoch transition
      events.domains.domainEpochCompleted.name,
      events.domains.forceDomainEpochTransition.name,
      // operator and nomination
      events.domains.operatorRegistered.name,
      events.domains.operatorDeregistered.name,
      events.domains.operatorNominated.name,
      // deposit and stake
      events.domains.storageFeeDeposited.name,
      events.domains.withdrewStake.name,
      events.domains.operatorUnlocked.name,
      events.domains.fundsUnlocked.name,
      // bundle
      events.domains.bundleStored.name,
      // rewards and slashing
      events.domains.operatorRewarded.name,
      events.domains.operatorSlashed.name,
      // fees
      events.domains.operatorTaxCollected.name,
    ],
    call: true,
    extrinsic: true,
  })
  .setFields({
    event: {
      args: true,
    },
    extrinsic: {
      hash: true,
      fee: true,
    },
    block: {
      timestamp: true,
    },
  });
// Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
//.useArchiveOnly()

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
