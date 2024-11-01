import { account, blockNumber } from "@autonomys/auto-consensus";
import { ApiPromise, stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { request } from "http";
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

export const getAccountBalance = async (accountId: string) =>
  await account(api as any, accountId);

export const consensusUniqueRowsMapping = async (blockNumber: bigint) => {
  const postData = stringify({
    queueName: "taurus",
    taskName: "consensusUniqueRowsMapping",
    data: {
      blockNumber: blockNumber.toString(),
    },
    opts: {
      delay: 60000,
    },
    jobId: "consensusUniqueRowsMapping:" + blockNumber.toString(),
  });

  const options = {
    hostname: "taskboard",
    port: 3000,
    path: "/add-task",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = request(options, (res) => res.setEncoding("utf8"));
  req.on("error", (e) => {
    logger.error(`Problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
};

export const preventIndexingTooCloseToTheHeadOfTheChain = async (
  indexingBlockHeight: number | bigint
) => {
  if (!unsafeApi) throw new Error("Unsafe API not found");
  if (
    typeof indexingBlockHeight !== "number" &&
    typeof indexingBlockHeight !== "bigint"
  )
    throw new Error("Indexing block height must be a number or bigint");
  if (typeof indexingBlockHeight === "number")
    indexingBlockHeight = BigInt(indexingBlockHeight);

  const targetHeight = await blockNumber(unsafeApi as unknown as ApiPromise);
  if (indexingBlockHeight > BigInt(targetHeight - 100))
    throw new Error("Indexing too close to the head of the chain, skipping...");
};
