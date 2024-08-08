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
    events: true,
    stack: true,
    extrinsic: true,
  })
  .addEvent({
    name: [
      // accounts
      events.balances.transfer.name,
      events.system.remarked.name,
      events.system.extrinsicSuccess.name,
      events.system.extrinsicFailed.name,
      events.transactionPayment.transactionFeePaid.name,
      // farmers
      events.rewards.voteReward.name,
      events.rewards.blockReward.name,
      // operators & nominators
      events.domains.operatorRewarded.name,
      events.domains.operatorTaxCollected.name,
      events.domains.bundleStored.name,
      // to-do
      events.domains.operatorRegistered.name,
      events.domains.operatorNominated.name,
      events.domains.withdrewStake.name,
      events.domains.storageFeeDeposited.name,
    ],
    call: true,
    stack: true,
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
      args: true,
      hash: true,
      signature: true,
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
      extrinsicIndex: true,
      callAddress: true,
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
