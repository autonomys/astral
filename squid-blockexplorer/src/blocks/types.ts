import { SubstrateBlock } from '@subsquid/substrate-processor';
import { CallItem, EventItem } from '../processor';
import { Block, Extrinsic, Call, Event, Log } from '../model';

export interface ProcessBlocksDependencies {
  getSpacePledged: (header: SubstrateBlock) => Promise<bigint>;
  getHistorySize: (header: SubstrateBlock) => Promise<bigint>;
  processExtrinsics: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    calls: CallItem[],
    block: Block,
  ) => Promise<void>;
  processCalls: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    calls: CallItem[],
    block: Block,
  ) => Promise<void>;
  getEvents: (
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    eventItems: EventItem[],
    block: Block,
  ) => Promise<Event[]>;
  getLogs: (header: SubstrateBlock, block: Block) => Promise<Log[]>
}

export type ExtrinsicsMap = Map<string, Extrinsic>;
export type CallsMap = Map<string, Call>;
