import { cidOfNode, cidToString, decodeNode } from "@autonomys/auto-dag-data";
import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { Cid, ModifiedArgs, ParsedArgs } from "./types";
import { decodeLog, hexToUint8Array } from "./utils";

const DEFAULT_ACCOUNT_ID = "0x00";

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

export const parseDataToCid = (data: string): ParsedArgs => {
  let cid: Cid = undefined;
  let modifiedArgs: ModifiedArgs = undefined;
  try {
    const node = decodeNode(hexToUint8Array(data));
    cid = cidToString(cidOfNode(node));
    modifiedArgs = stringify({ cid });
  } catch (error) {
    logger.error("Error decoding remark or seedHistory extrinsic");
    logger.error(error);
  }
  return { cid, modifiedArgs };
};
