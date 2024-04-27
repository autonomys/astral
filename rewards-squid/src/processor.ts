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
      events.domains.storageFeeDeposited.name,
      events.domains.operatorRegistered.name,
      events.domains.operatorDeregistered.name,
      events.domains.operatorNominated.name,
      events.domains.operatorRewarded.name,
      events.domains.operatorSlashed.name,
      events.domains.domainEpochCompleted.name,
      events.domains.withdrewStake.name,
      events.rewards.blockReward.name,
      events.rewards.voteReward.name,
    ],
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
export type BlockHeader = _BlockHeader<Fields>;
export type Block = _Block<Fields>;
export type Event = _Event<Fields>;
export type Call = _Call<Fields>;
export type Extrinsic = _Extrinsic<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
