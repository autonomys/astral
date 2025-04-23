import { ApiPromise, createConnection } from "@autonomys/auto-utils";

const ENDPOINT = Deno.env.get("ENDPOINT") || "ws://caddy:8000";

export const api = await createConnection(ENDPOINT);

export const getApiAt = async (api: ApiPromise, blockHash: string) =>
  await api.at(blockHash);
