import { SubstrateBatchProcessor } from "@subsquid/substrate-processor";

export interface ProcessorConfig {
  chainName: string;
  prefix?: number | string;
  rpcEndpoint: Parameters<SubstrateBatchProcessor<any>["setRpcEndpoint"]>[0];
  blockRange?: Parameters<SubstrateBatchProcessor<any>["setBlockRange"]>[0];
}
