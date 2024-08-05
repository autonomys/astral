import {
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Block as _Block,
  BlockHeader as _BlockHeader,
  Call as _Call,
  Event as _Event,
  Extrinsic as _Extrinsic,
} from "@subsquid/substrate-processor";
import { assertNotNull } from "@subsquid/util-internal";

import { events } from "./types";

export const processor = new SubstrateBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ENDPOINT),
    rateLimit: 10,
  })
  .setBlockRange({ from: 0 })
  .addEvent({
    name: [
      events.balances.balanceSet.v0.name,
      events.balances.deposit.v0.name,
      events.balances.endowed.v0.name,
      events.balances.reserved.v0.name,
      events.balances.reserveRepatriated.v0.name,
      events.balances.slashed.v0.name,
      events.balances.transfer.v0.name,
      events.balances.withdraw.v0.name,
      events.balances.unreserved.v0.name,
      events.balances.burned.v0.name,
      events.balances.restored.v0.name,
    ],
    extrinsic: true,
  })
  .addCall({})
  .setFields({
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
      fee: true,
    },
    block: {
      timestamp: true,
    },
  });
// Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
//.useArchiveOnly()

export type Fields = SubstrateBatchProcessorFields<typeof processor>;
export type Block = _Block<Fields>;
export type BlockHeader = _BlockHeader<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
