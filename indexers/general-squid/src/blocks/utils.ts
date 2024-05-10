import { ApiPromise } from "@polkadot/api";
import { hexToString } from "@polkadot/util";
import { BlockHeader } from "@subsquid/substrate-processor";
import { digest } from "../types/system/storage";
import { DigestItem_PreRuntime } from "../types/v1";
import { SubPreDigest } from "./types";

/**
 * Converts a SCALE-encoded log into a human-readable format
 * @param {null | Uint8Array | Uint8Array[]} value - SCALE-encoded log
 * @return {null | {data: string} | {engine: string, data: string}} - human-readable log
 */
export function decodeLog(
  value: null | Uint8Array | Uint8Array[] | [string, string]
) {
  if (!value) return null;

  if (Array.isArray(value)) {
    const engine = hexToString(value[0].toString());
    const data = value[1];

    return {
      engine,
      data,
    };
  }

  return { data: value };
}

export async function getBlockAuthor(block: BlockHeader, api: ApiPromise) {
  const digestLogs = await digest.v0.get(block);

  const preRuntimeRaw = digestLogs?.logs.find(
    (digestItem) => digestItem.__kind === "PreRuntime"
  );

  if (!preRuntimeRaw) return "";

  const value = decodeLog((preRuntimeRaw as DigestItem_PreRuntime).value);
  const type: SubPreDigest = api.registry.createType(
    "SubPreDigest",
    value?.data
  );

  return type.solution.reward_address.toString();
}
