import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import type { ProcessorContext } from "../processor";

export const hexToAccount = (raw: string): string => {
  const signer = Buffer.from(raw.slice(2), "hex");

  return codec(2254).encode(signer);
};

export const getCallSigner = (
  call: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["call"]
): string => hexToAccount((call as any).origin.value.value);

export const appendOrArray = <T>(arr: T[] | undefined, item: T): T[] =>
  !arr ? [item] : [...arr, item];
