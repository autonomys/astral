import { CallItem } from '../processor';
import { Block, Account } from '../model';
import { createExtrinsic, createCall } from './utils';
import { ExtrinsicsMap, CallsMap } from './types';
import { SubstrateBlock } from '@subsquid/substrate-processor';

export function processExtrinsicsFactory(getOrCreateAccount: (header: SubstrateBlock, accountId: string) => Promise<Account>, addExtrinsicModuleName: (name:string) => Promise<void>) {
  return async function processExtrinsics(extrinsicsMap: ExtrinsicsMap, callsMap: CallsMap, calls: CallItem[], block: Block, header: SubstrateBlock) {
    for (const item of calls) {
      let signer = null;
      let signature = null;

      if (item.extrinsic.signature) {
        signer = await getOrCreateAccount(header, item.extrinsic.signature.address.value);
        signature = item.extrinsic.signature.signature.value;
      }
      await addExtrinsicModuleName(item.name);
      const extrinsic = createExtrinsic(item, block, signature, signer);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const call = createCall(item, block, extrinsic!, null);
      extrinsicsMap.set(extrinsic.id, extrinsic);
      callsMap.set(call.id, call);
    }
  };
}

export async function processCalls(extrinsicsMap: ExtrinsicsMap, callsMap: CallsMap, calls: CallItem[], block: Block) {
  for (const item of calls) {
    const extrinsic = extrinsicsMap.get(item.extrinsic.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parent = callsMap.get(item.call.parent!.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const call = createCall(item, block, extrinsic!, parent!);
    callsMap.set(call.id, call);
  }
}
