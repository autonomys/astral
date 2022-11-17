import { SubstrateBlock } from '@subsquid/substrate-processor';
import { CallItem, EventItem } from '../processor';
import { Block, Extrinsic, Call, Event } from '../model';

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
  processEvents: (
    extrinsicsMap: ExtrinsicsMap, 
    callsMap: CallsMap, 
    events: Event[], 
    eventItems: EventItem[], 
    block: Block,
  ) => Promise<void>;
}


export type ExtrinsicsMap = Map<string, Extrinsic>;
export type CallsMap = Map<string, Call>;
