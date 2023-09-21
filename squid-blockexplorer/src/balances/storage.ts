import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Context } from '../processor';
import { BalancesAccountStorage, SystemAccountStorage } from '../types/storage';
import { Balance } from './types';

export function createSystemAccountStorage(ctx: Context, header: SubstrateBlock) {
  return new SystemAccountStorage(ctx, header);
}

export function createBalanceAccountStorage(ctx: Context, header: SubstrateBlock) {
  return new BalancesAccountStorage(ctx, header);
}

interface BalanceStorageProps {
  ctx: Context;
  createSystemAccountStorage: (ctx: Context, header: SubstrateBlock) => SystemAccountStorage;
  createBalanceAccountStorage: (ctx: Context, header: SubstrateBlock) => BalancesAccountStorage;
}

export class BalanceStorage {
  private readonly ctx: Context;
  private readonly createSystemAccountStorage: (ctx: Context, header: SubstrateBlock) => SystemAccountStorage;
  private readonly createBalanceAccountStorage: (ctx: Context, header: SubstrateBlock) => BalancesAccountStorage;

  constructor({ ctx, createSystemAccountStorage, createBalanceAccountStorage }: BalanceStorageProps) {
    this.ctx = ctx;
    this.createBalanceAccountStorage = createBalanceAccountStorage;
    this.createSystemAccountStorage = createSystemAccountStorage;
  }

  public async getBalance(header: SubstrateBlock, accountId: Buffer) {
    const systemAccountBalance = await this.getSystemAccountBalance(header, accountId);
    const balancesAccountBalance = await this.getBalancesAccountBalance(header, accountId);
    return systemAccountBalance || balancesAccountBalance;
  }

  private async getSystemAccountBalance(header: SubstrateBlock, accountId: Buffer): Promise<Balance | undefined> {
    const storage = this.createSystemAccountStorage(this.ctx, header);
    if (!storage.isExists) return undefined;
    // TODO: consider converting account to Buffer within this func
    if (storage.isV0) {
      const balance = await storage.asV0.get(accountId);
      const { free, reserved } = balance.data;
      return { free, reserved };
    }

    const balance = await storage.asV0.get(accountId);
    const { free, reserved } = balance.data;
    return { free, reserved };
  }

  private async getBalancesAccountBalance(header: SubstrateBlock, accountId: Buffer): Promise<Balance | undefined> {
    const storage = this.createBalanceAccountStorage(this.ctx, header);
    if (!storage.isExists) return undefined;
    // TODO: consider converting account to Buffer within this func

    if (storage.isV0) {
      const balance = await storage.asV0.get(accountId);
      const { free, reserved } = balance;
      return { free, reserved };
    }

    const balance = await storage.asV0.get(accountId);
    const { free, reserved } = balance;
    return { free, reserved };
  }
}

