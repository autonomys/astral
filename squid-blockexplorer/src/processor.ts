import {
    SubstrateBatchProcessor,
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
} from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import config from './config'
import { getErrorMessage } from './utils'
import { processBalances } from './balances'

export type Item = BatchProcessorItem<typeof processor>
export type EventItem = BatchProcessorEventItem<typeof processor>
export type CallItem = BatchProcessorCallItem<typeof processor>
export type Context = BatchContext<Store, Item>

const addEventDataConfig = {
    data: { event: { args: true } },
} as const

const processor = new SubstrateBatchProcessor()
    .setBatchSize(config.batchSize || 500)
    .setDataSource(config.dataSource)
    .setBlockRange(config.blockRange || { from: 0 })
    .addEvent('Balances.Endowed', addEventDataConfig)
    .addEvent('Balances.Transfer', addEventDataConfig)
    .addEvent('Balances.BalanceSet', addEventDataConfig)
    .addEvent('Balances.Reserved', addEventDataConfig)
    .addEvent('Balances.Unreserved', addEventDataConfig)
    .addEvent('Balances.ReserveRepatriated', addEventDataConfig)
    .addEvent('Balances.Deposit', addEventDataConfig)
    .addEvent('Balances.Withdraw', addEventDataConfig)
    .addEvent('Balances.Slashed', addEventDataConfig)
    .includeAllBlocks();

processor.run(new TypeormDatabase(), processBlocks)

async function processBlocks(ctx: Context): Promise<void> {
    try {
        await processBalances(ctx);
        // TODO: add other things to process here (history size, space pledged, etc.)
    } catch (error) {
        ctx.log.error('Error while processing blocks: ');
        ctx.log.error(getErrorMessage(error));
    }
}
