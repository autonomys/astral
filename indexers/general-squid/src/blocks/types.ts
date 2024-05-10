import { Struct, u64 } from "@polkadot/types";
import { AccountId32 } from "@polkadot/types/interfaces";

interface Solution extends Struct {
  readonly public_key: AccountId32;
  readonly reward_address: AccountId32;
}

export interface SubPreDigest extends Struct {
  readonly slot: u64;
  readonly solution: Solution;
}

export const BlockChainTypes = {
  Solution: {
    public_key: "AccountId32",
    reward_address: "AccountId32",
  },
  SubPreDigest: {
    slot: "u64",
    solution: "Solution",
  },
};
