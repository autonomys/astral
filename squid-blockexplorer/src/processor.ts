import {
    SubstrateBatchProcessor,
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
} from '@subsquid/substrate-processor';
import { Store, TypeormDatabase } from '@subsquid/typeorm-store';
import config from './config';
import { processBalancesFactory, createProcessBalancesDependencies } from './balances';
import { processBlocksFactory, createProcessBlocksDependencies } from './blocks';

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;
// workaround for types: 
// original call and event items have `name: '*'` instead of `name: string`
type ProcessorCallItem = BatchProcessorCallItem<typeof processor>;
type ProcessorEventItem = BatchProcessorEventItem<typeof processor>;
export type CallItem = Omit<ProcessorCallItem, 'name'> & { name: string };
export type EventItem = Omit<ProcessorEventItem, 'name'> & { name: string };

const processor = new SubstrateBatchProcessor()
    .setBatchSize(config.batchSize || 500)
    .setDataSource(config.dataSource)
    .setBlockRange(config.blockRange || { from: 0 })
    .addEvent('*') // process all events
    .addCall('*') // process all calls
    .includeAllBlocks();

processor.run(new TypeormDatabase(), processChain);

async function processChain(ctx: Context): Promise<void> {
    const processBlocksDependencies = createProcessBlocksDependencies(ctx);
    const processBalancesDependencies = createProcessBalancesDependencies(ctx);
    const processBlocks = processBlocksFactory(processBlocksDependencies);
    const processBalances = processBalancesFactory(processBalancesDependencies);
    await processBlocks(ctx);
    await processBalances(ctx);
}
