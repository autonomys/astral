export const CONFIG = {
  prefix: 2254,
};

export const PREFIX = 2254;

export const TYPES = {
  Solution: {
    public_key: "AccountId32",
    reward_address: "AccountId32",
  },
  SubPreDigest: {
    slot: "u64",
    solution: "Solution",
  },
};
