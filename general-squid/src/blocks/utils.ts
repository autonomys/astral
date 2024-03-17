import { hexToString } from "@polkadot/util";

/**
 * Converts a SCALE-encoded log into a human-readable format
 * @param {null | Uint8Array | Uint8Array[]} value - SCALE-encoded log
 * @return {null | {data: string} | {engine: string, data: string}} - human-readable log
 */
export function decodeLog(value: null | Uint8Array | Uint8Array[]) {
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
