import { SubstrateCall } from '@subsquid/substrate-processor';
import { CallItem } from '../processor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getOriginAccountId(origin: any) {
  if (
    origin &&
    origin.__kind === 'system' &&
    origin.value.__kind === 'Signed'
  ) {
    return origin.value.value;
  } else {
    return undefined;
  }
}

export function processCall(item: CallItem, accountIdsHex: Set<string>) {
  const call = item.call as SubstrateCall;
  if (call.parent != null) return;

  const id = getOriginAccountId(call.origin);
  if (id == null) return;

  accountIdsHex.add(id);
}
