export const PROCESSOR_CONFIG = {
  chainName: "gemini-3g",
  prefix: 2254,
  dataSource: {
    chain: process.env.CHAIN_RPC_ENDPOINT as string,
  },
  typesBundle: "gemini-3g",
};
