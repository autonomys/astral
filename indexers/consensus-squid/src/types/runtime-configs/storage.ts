import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'

export const enableDomains =  {
    /**
     *  Whether to enable calls in pallet-domains.
     */
    v0: new StorageType('RuntimeConfigs.EnableDomains', 'Default', [], sts.boolean()) as EnableDomainsV0,
}

/**
 *  Whether to enable calls in pallet-domains.
 */
export interface EnableDomainsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const enableDynamicCostOfStorage =  {
    /**
     *  Whether to enable dynamic cost of storage.
     */
    v0: new StorageType('RuntimeConfigs.EnableDynamicCostOfStorage', 'Default', [], sts.boolean()) as EnableDynamicCostOfStorageV0,
}

/**
 *  Whether to enable dynamic cost of storage.
 */
export interface EnableDynamicCostOfStorageV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const enableBalanceTransfers =  {
    /**
     *  Whether to enable balances transfers.
     */
    v0: new StorageType('RuntimeConfigs.EnableBalanceTransfers', 'Default', [], sts.boolean()) as EnableBalanceTransfersV0,
}

/**
 *  Whether to enable balances transfers.
 */
export interface EnableBalanceTransfersV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const enableNonRootCalls =  {
    /**
     *  Whether to enable calls from non-root account.
     */
    v0: new StorageType('RuntimeConfigs.EnableNonRootCalls', 'Default', [], sts.boolean()) as EnableNonRootCallsV0,
}

/**
 *  Whether to enable calls from non-root account.
 */
export interface EnableNonRootCallsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const confirmationDepthK =  {
    v0: new StorageType('RuntimeConfigs.ConfirmationDepthK', 'Default', [], sts.number()) as ConfirmationDepthKV0,
}

export interface ConfirmationDepthKV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}
