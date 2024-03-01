import { Account, Nominator, Operator } from "../model";
import { ProcessorContext } from "../processor";
import { Store } from '@subsquid/typeorm-store';
import { ApiPromise } from "@polkadot/api";

/**
 *
 * @param ctx
 * @param api
 * @returns
 */
  export async function getOrCreateOperator(
    ctx: ProcessorContext<Store>,
    operatorId: bigint,
    blockNumber: number,
    api: ApiPromise
  ): Promise<Operator | undefined> {
    let operator = await ctx.store.get(Operator, operatorId.toString());

    const nominators = await api.query.domains.nominators.entries(operatorId);
    const nominatorsLength = nominators.length;

    if (!operator) {
      const operatorInfo = (
        await api.query.domains.operators(operatorId)
      ).toJSON() as any;

      const ownerAccount = (
        await api.query.domains.operatorIdOwner(operatorId)
      ).toJSON();
      if (operatorInfo) {
        operator = new Operator({
          id: operatorId.toString(),
          orderingId: Number(operatorId),
          operatorOwner: ownerAccount?.toString(),
          status: operatorInfo.status.toString(),
          signingKey: operatorInfo.signingKey,
          totalShares: BigInt(operatorInfo.totalShares),
          currentEpochRewards: operatorInfo.currentEpochRewards,
          currentTotalStake: BigInt(operatorInfo.currentTotalStake),
          nominatorAmount: nominatorsLength,
          nominationTax: operatorInfo.nominationTax,
          minimumNominatorStake: BigInt(operatorInfo.minimumNominatorStake),
          nextDomainId: operatorInfo.nextDomainId,
          currentDomainId: operatorInfo.currentDomainId,
          updatedAt: BigInt(blockNumber),
        });

        await ctx.store.insert(operator);
      }
    } 

    return operator;
  };

export async function getOrCreateNominators(
    ctx: ProcessorContext<Store>,
    api: ApiPromise,
    operator: Operator
  ): Promise<Nominator[]> {
    const nominatorsList: Nominator[] = [];
    const operatorId = BigInt(operator.id);
    const block = ctx.blocks[ctx.blocks.length - 1];
    const blockHeight = BigInt(block.header.height);

    const nominators = await api.query.domains.nominators.entries(operatorId);
    const nominatorsLength = nominators.length;

    for (let i = 0; i < nominatorsLength; i++) {
      const nominatorId = nominators[i][0].args[1].toString();

      let nominator = await ctx.store.get(
        Nominator,
        `${operator.id}-${nominatorId}`
      );

      const nominatorInfo = nominators[i][1].toJSON() as any;

      const existingNominator = await ctx.store.get(Nominator, nominatorId);
      const hexAccountId = api.registry
        .createType("AccountId", nominatorId)
        .toHex();
      const account = await getOrCreateAccount(ctx, hexAccountId);

      nominator = new Nominator({
        ...existingNominator,
        id: `${operator.id}-${nominatorId}`,
        operator: operator,
        account: account,
        shares: BigInt(nominatorInfo.shares),
        updatedAt: blockHeight,
      });

      await ctx.store.save(nominator);

      nominatorsList.push(nominator);
    }

    return nominatorsList;
  };

export async function getOrCreateAccount(
    ctx: ProcessorContext<Store>, 
    accountId: string
  ): Promise<Account> {
    let account = await ctx.store.get(Account, accountId);

    if (!account) {
      account = new Account({
        id: accountId,
      });

      await ctx.store.insert(account);
    }

    return account;
  };