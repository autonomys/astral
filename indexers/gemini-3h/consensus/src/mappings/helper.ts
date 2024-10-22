import { account } from "@autonomys/auto-consensus";
import { SubstrateBlock } from "@subql/types";
import { createAndSaveBalanceHistory } from "./db";
import { decodeLog } from "./utils";

const DEFAULT_ACCOUNT_ID = "0x00";

// Core Consensus Helper Functions

export const getBlockAuthor = (block: SubstrateBlock): string => {
  const { digest } = block.block.header;
  const preRuntimeRaw = digest.logs.find((digestI) => digestI.isPreRuntime);
  if (preRuntimeRaw) {
    const value = decodeLog(preRuntimeRaw.asPreRuntime);
    if (value) {
      api.registry.register({
        Solution: {
          public_key: "AccountId32",
          reward_address: "AccountId32",
        },
        SubPreDigest: {
          slot: "u64",
          solution: "Solution",
        },
      });
      const type = api.registry.createType("SubPreDigest", value.data);
      const publicKey = (type.toPrimitive() as any).solution.public_key;
      const rewardAddress = (type.toPrimitive() as any).solution.reward_address;
      return rewardAddress;
    }
  }
  return DEFAULT_ACCOUNT_ID;
};

// Accounts Helper Functions

export const updateAccountBalance = async (
  accountId: string,
  blockNumber: bigint
) => {
  const _account = await account(api as any, accountId);
  const { free, reserved } = _account.data;

  await createAndSaveBalanceHistory(
    accountId,
    blockNumber,
    free,
    reserved,
    free + reserved
  );

  return _account;
};
