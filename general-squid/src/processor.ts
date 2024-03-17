import {
  Block as Block_,
  BlockHeader as BlockHeader_,
  Call as Call_,
  DataHandlerContext,
  Event as Event_,
  Extrinsic as Extrinsic_,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
} from "@subsquid/substrate-processor";
import { assertNotNull } from "@subsquid/util-internal";

export const processor = new SubstrateBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ENDPOINT),
    rateLimit: 10,
  })
  .setBlockRange({ from: 0 })
  .setFields({
    block: {
      timestamp: true,
      digest: true,
      extrinsicsRoot: true,
      stateRoot: true,
      validator: true,
    },
    call: {
      name: true,
      args: true,
      origin: true,
      success: true,
      error: true,
    },
    event: {
      name: true,
      args: true,
      phase: true,
    },
    extrinsic: {
      hash: true,
      success: true,
      error: true,
      fee: true,
      signature: true,
      tip: true,
      version: true,
    },
  })
  .addCall({
    extrinsic: true,
    stack: true,
  })
  .addEvent({
    call: true,
    extrinsic: true,
  })
  .includeAllBlocks();

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Call = Call_<Fields>;
export type Event = Event_<Fields>;
export type Extrinsic = Extrinsic_<Fields>;
export type Block = Block_<Fields>;
export type BlockHeader = BlockHeader_<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
