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
  .setGateway(
    assertNotNull(process.env.CONSENSUS_GATEWAY, "No Gateway endpoint supplied")
  )
  .setRpcEndpoint({
    url: assertNotNull(
      process.env.RPC_CONSENSUS_HTTP,
      "No RPC endpoint supplied"
    ),
    // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
    rateLimit: 10,
  })
  .setBlockRange({
    from: 0,
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
    block: {
      height: true,
      hash: true,
      timestamp: true,
    },
    extrinsic: {
      index: true,
      version: true,
      fee: true,
      success: true,
      hash: true,
    },
    call: {
      address: true,
      name: true,
      args: true,
      origin: true,
    },
    event: {
      name: true,
      args: true,
    },
  });

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
export type Ctx<S> = ProcessorContext<S>;
export type CtxBlock = Ctx<Fields>["blocks"][0];
export type CtxExtrinsic = CtxBlock["extrinsics"][0];
export type CtxEvent = CtxExtrinsic["events"][0];
