import { SubstrateBlock } from '@subsquid/substrate-processor';
import { CallItem, EventItem } from '../processor';

export interface Balance {
  free: bigint;
  reserved: bigint;
}

export interface ProcessBalancesDependencies {
  processCall: (item: CallItem, accountIdsHex: Set<string>) => void;
  processEvent: (item: EventItem, accountIdsHex: Set<string>) => void;
  saveAccounts: (header: SubstrateBlock, accountIds: Buffer[]) => Promise<void>;
}
