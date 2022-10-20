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
    prefix: 'gemini-2a',
    dataSource: {
        // TODO: replace with env vars
        archive: 'http://164.92.238.249:4444/graphql',
        chain: 'wss://eu-0.gemini-2a.subspace.network/ws',
    },
    typesBundle: 'gemini-2a',
    batchSize: 100,
}

export default config;
