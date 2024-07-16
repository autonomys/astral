import { codec } from "@subsquid/ss58";
import type { Store } from "@subsquid/typeorm-store";
import type { ProcessorContext } from "../processor";

export const getCallSigner = (
  call: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["call"]
): string => {
  const raw = (call as any).origin.value.value;

  const signer = Buffer.from(raw.slice(2), "hex");

  const account = codec(2254).encode(signer);
  console.log("account", account);

  return account;
};
