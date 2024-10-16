import { spacePledge } from "@autonomys/auto-consensus";
import type { Api } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { decodeLog } from "./utils";

const DEFAULT_ACCOUNT_ID = "0x00";

const PIECE_SIZE = BigInt(1048576);

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

export const calculateSpacePledged = async (): Promise<bigint> => {
  const totalSpacePledged = await spacePledge(api as unknown as Api);
  return typeof totalSpacePledged === "number"
    ? BigInt(totalSpacePledged)
    : totalSpacePledged;
};

export const calculateBlockchainSize = async (): Promise<bigint> => {
  const segmentCommitment =
    await api.query.subspace.segmentCommitment.entries();
  const segmentsCount = BigInt(segmentCommitment.length);

  const blockchainSize = PIECE_SIZE * BigInt(256) * segmentsCount;
  return blockchainSize;
};
