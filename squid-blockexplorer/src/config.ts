import { SubstrateProcessor } from '@subsquid/substrate-processor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Parameters<T> = T extends (...args: infer T) => any ? T : never

enum HandlerParams {
    NAME,
    OPTIONS,
    FUNC,
}

export interface ProcessorConfig {
    chainName: string
    prefix: number | string
    dataSource: Parameters<SubstrateProcessor<any>['setDataSource']>[HandlerParams.NAME]
    typesBundle: Parameters<SubstrateProcessor<any>['setTypesBundle']>[HandlerParams.NAME]
    batchSize?: Parameters<SubstrateProcessor<any>['setBatchSize']>[HandlerParams.NAME]
    port?: Parameters<SubstrateProcessor<any>['setPrometheusPort']>[HandlerParams.NAME]
    blockRange?: Parameters<SubstrateProcessor<any>['setBlockRange']>[HandlerParams.NAME]
}

const config: ProcessorConfig = {
    chainName: 'gemini-2a',
    prefix: 2254,
    dataSource: {
        archive: process.env.ARCHIVE_ENDPOINT as string,
        chain: process.env.CHAIN_RPC_ENDPOINT as string,
    },
    typesBundle: 'gemini-2a',
    batchSize: 50,
}

export default config;
