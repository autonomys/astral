import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Hash } from '@polkadot/types/interfaces/runtime';

export function snakeToCamel(str: string) {
  return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

export function submitTxAndWaitForBlockHash(api: ApiPromise, from: KeyringPair, to: string, amount: bigint) {
  let unsubscribe: () => void;
  return new Promise<Hash>((resolve) => {
    api.tx
      // use sudo.sudoAs for now as a workaround, otherwise cannot do transfers (using Gemini-3b)
      // TODO: remove when runtime is updated
      .sudo.sudoAs(
        from.address,
        api.tx.balances.transfer(to, amount),
      )
      .signAndSend(from, (result) => {
        console.log(`Balance transfer: Current status is ${result.status}`);

        if (result.status.isInBlock) {
          console.log(`Balance ransfer: Transaction included at blockHash ${result.status.asInBlock}`);
          resolve(result.status.asInBlock);
          unsubscribe();
        }
      })
      .then((unsub) => {
        unsubscribe = unsub;
      });
  });
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
