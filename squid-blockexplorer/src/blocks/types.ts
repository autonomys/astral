import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Struct, u64 } from "@polkadot/types";
import { AccountId32 } from "@polkadot/types/interfaces";

import { CallItem, EventItem } from "../processor";
import {
  Block,
  Extrinsic,
  Call,
  Event,
  Log,
  Account,
  RewardEvent,
} from "../model";

export interface ProcessBlocksDependencies {
  getSpacePledged: (header: SubstrateBlock) => Promise<bigint>;
  getHistorySize: (header: SubstrateBlock) => Promise<bigint>;
  processExtrinsics: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    calls: CallItem[],
    block: Block,
    header: SubstrateBlock
  ) => Promise<void>;
  processCalls: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    calls: CallItem[],
    block: Block
  ) => Promise<void>;
  processEvents: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    eventItems: EventItem[],
    block: Block,
    header: SubstrateBlock
  ) => Promise<[Event[], RewardEvent[]]>;
  getLogs: (header: SubstrateBlock, block: Block) => Promise<Log[]>;
  getBlockAuthor: (header: SubstrateBlock) => Promise<Account | undefined>;
}

export type ExtrinsicsMap = Map<string, Extrinsic>;
export type CallsMap = Map<string, Call>;

interface Solution extends Struct {
  readonly public_key: AccountId32;
  readonly reward_address: AccountId32;
}

export interface SubPreDigest extends Struct {
  readonly slot: u64;
  readonly solution: Solution;
}
