import { StoreWithCache } from "@belopash/typeorm-store";
import * as ss58 from "@subsquid/ss58";
import { randomUUID } from "crypto";
import {
  Account,
  AccountReward,
  DomainEpoch,
  Nominator,
  Operator,
  OperatorReward,
  OperatorRewardEvent,
  RewardEvent,
} from "../model";
import { Block, BlockHeader, Event, ProcessorContext } from "../processor";
import { events } from "../types";
import { domains } from "../types/storage";
import { CONFIG } from "./constants";

/**
 *
 * @param id
 * @returns substrate account address properly encoded
 */
export function encodeId(id: Uint8Array | string) {
  if (id === "") return "";
  return ss58.codec(CONFIG.prefix).encode(id);
}

/**
 *
 * @param ctx
 * @param api
 * @returns
 */
export async function getOrCreateOperator(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  operatorId: bigint
): Promise<Operator | undefined> {
  let operator = await ctx.store.get(Operator, operatorId.toString());

  if (!operator) {
    const operatorInfo = await domains.operators.v1.get(header, operatorId);
    const nominatorsLength = await domains.nominatorCount.v0.get(
      header,
      operatorId
    );

    const ownerAccount = await domains.operatorIdOwner.v0.get(
      header,
      operatorId
    );
    const encodedOwnerAccount = encodeId(ownerAccount || "");

    if (operatorInfo) {
      operator = new Operator({
        id: operatorId.toString(),
        orderingId: Number(operatorId),
        operatorOwner: encodedOwnerAccount,
        status: JSON.stringify(operatorInfo.status),
        signingKey: operatorInfo.signingKey,
        totalShares: operatorInfo.currentTotalShares,
        currentEpochRewards: operatorInfo.currentEpochRewards,
        currentTotalStake: operatorInfo.currentTotalStake,
        nominatorAmount: nominatorsLength || 0,
        nominationTax: operatorInfo.nominationTax,
        minimumNominatorStake: operatorInfo.minimumNominatorStake,
        nextDomainId: operatorInfo.nextDomainId,
        currentDomainId: operatorInfo.currentDomainId,
        updatedAt: header.height,
      });

      await ctx.store.insert(operator);
    }
  }

  return operator;
}

export async function getOrCreateNominator(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  operatorId: bigint,
  nominatorId: string
): Promise<Nominator> {
  const operatorIdStr = operatorId.toString();
  const encodedNominatorId = encodeId(nominatorId);
  const operator = await getOrCreateOperator(ctx, header, operatorId);

  let nominator = await ctx.store.get(
    Nominator,
    `${operatorIdStr}-${encodedNominatorId}`
  );

  if (!nominator) {
    const nominatorInfo = await domains.deposits.v0.get(
      header,
      operatorId,
      nominatorId
    );

    const account = await getOrCreateAccount(ctx, nominatorId);

    nominator = new Nominator({
      id: `${operatorIdStr}-${encodedNominatorId}`,
      operator: operator,
      account: account,
      shares: BigInt(nominatorInfo?.known.shares || 0),
      updatedAt: header.height,
    });

    await ctx.store.insert(nominator);
  }

  return nominator;
}

export async function getOrCreateAccount(
  ctx: ProcessorContext<StoreWithCache>,
  accountId: string
): Promise<Account> {
  const encodedAccountId = encodeId(accountId);
  let account = await ctx.store.get(Account, encodedAccountId);

  if (!account) {
    account = new Account({
      id: encodedAccountId,
    });

    await ctx.store.insert(account);
  }

  return account;
}

export async function updateOperatorStatus(
  ctx: ProcessorContext<StoreWithCache>,
  operatorId: bigint,
  header: BlockHeader
) {
  const operator = await ctx.store.get(Operator, operatorId.toString());
  const operatorInfo = await domains.operators.v1.get(header, operatorId);
  const nominatorCount = await domains.nominatorCount.v0.get(
    header,
    operatorId
  );

  if (operator && operatorInfo) {
    operator.currentDomainId = operatorInfo.currentDomainId;
    operator.nominatorAmount = nominatorCount
      ? nominatorCount
      : operator.nominatorAmount;
    operator.currentTotalStake = operatorInfo.currentTotalStake;
    operator.totalShares = operatorInfo.currentTotalShares;
    operator.nextDomainId = operatorInfo.nextDomainId;
    operator.currentEpochRewards = operatorInfo.currentEpochRewards;
    operator.status = JSON.stringify(operatorInfo.status);
    operator.updatedAt = header.height;
    await ctx.store.save(operator);
  }
}

export async function updateOperatorStakes(
  ctx: ProcessorContext<StoreWithCache>,
  operatorId: bigint,
  header: BlockHeader
) {
  const operator = await ctx.store.get(Operator, operatorId.toString());
  const operatorInfo = await domains.operators.v1.get(header, operatorId);
  const nominatorsLength = await domains.nominatorCount.v0.get(
    header,
    operatorId
  );

  if (operator && operatorInfo) {
    operator.nominatorAmount = nominatorsLength
      ? nominatorsLength
      : operator.nominatorAmount;
    operator.currentTotalStake = operatorInfo.currentTotalStake;
    operator.totalShares = operatorInfo.currentTotalShares;
    operator.updatedAt = header.height;
    await ctx.store.save(operator);
  }
}

export async function updateOperatorRewards(
  ctx: ProcessorContext<StoreWithCache>,
  block: Block,
  event: Event
) {
  const operatorEvents: OperatorRewardEvent[] = [];

  const { operatorId, reward } =
    events.domains.operatorRewarded.v0.decode(event);

  const operator = await ctx.store.get(Operator, operatorId.toString());

  if (operator) {
    const operatorReward = new OperatorRewardEvent({
      id: event.id,
      indexInBlock: event.index,
      name: event.name,
      timestamp: new Date(block.header.timestamp || 0),
      blockNumber: block.header.height,
      extrinsicHash: event.extrinsic?.hash,
      amount: reward,
      operator: operator,
    });

    operatorEvents.push(operatorReward);
  }

  return operatorEvents;
}

export async function updateEpochCompleted(header: BlockHeader, event: Event) {
  const { domainId, completedEpochIndex } =
    events.domains.domainEpochCompleted.v0.decode(event);

  const domainEpoch = new DomainEpoch({
    id: randomUUID(),
    domainId: domainId,
    epoch: completedEpochIndex,
    updatedAt: header.height,
  });

  return domainEpoch;
}

export async function updateOperatorStake(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  event: Event
) {
  const { operatorId, nominatorId } =
    events.domains.storageFeeDeposited.v1.decode(event);

  const nominator = await getOrCreateNominator(
    ctx,
    header,
    operatorId,
    nominatorId
  );

  if (nominator) {
    ctx.store.save(nominator);
  }
}

export async function updateWithdrewStake(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  event: Event
) {
  const { operatorId, nominatorId } =
    events.domains.withdrewStake.v0.decode(event);

  const encodedNominatorId = encodeId(nominatorId);

  const operator = await ctx.store.get(Operator, operatorId.toString());
  const operatorInfo = await domains.operators.v1.get(header, operatorId);
  const nominator = await ctx.store.get(
    Nominator,
    `${operatorId}-${encodedNominatorId}`
  );
  const nominatorCount = await domains.nominatorCount.v0.get(
    header,
    operatorId
  );

  if (operator && operatorInfo) {
    operator.nominatorAmount = nominatorCount ? nominatorCount : 0;
    operator.currentTotalStake = operatorInfo.currentTotalStake;
    operator.totalShares = operatorInfo.currentTotalShares;
    operator.currentEpochRewards = operatorInfo.currentEpochRewards;
    operator.status = JSON.stringify(operatorInfo.status);
    operator.updatedAt = header.height;

    await ctx.store.save(operator);
  }

  if (operator && nominator) {
    await ctx.store.remove(nominator);
  }
}

export async function processRewardEvent(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  event: Event
) {
  const address = event.args?.voter || event.args?.blockAuthor;

  const account = await getOrCreateAccount(ctx, address);

  const reward = BigInt(event.args.reward);

  const rewardEvent = new RewardEvent({
    id: event.id,
    indexInBlock: event.index,
    name: event.name,
    account,
    timestamp: new Date(header.timestamp || 0),
    blockNumber: header.height,
    extrinsicHash: event.extrinsic?.hash,
    amount: reward,
  });

  return rewardEvent;
}

export async function getOrCreateAccountRewards(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  account: Account
): Promise<AccountReward> {
  let accountReward = await ctx.store.get(AccountReward, account.id);

  if (!accountReward) {
    accountReward = new AccountReward({
      id: account.id,
      account: account,
      vote: BigInt(0),
      block: BigInt(0),
      operator: BigInt(0),
      totalRewards: BigInt(0),
      updatedAt: header.height,
    });
  }

  return accountReward;
}

export async function getOrCreateOperatorRewards(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  operator: Operator
): Promise<OperatorReward> {
  let operatorReward = await ctx.store.get(OperatorReward, operator.id);

  if (!operatorReward) {
    operatorReward = new OperatorReward({
      id: operator.id,
      amount: BigInt(0),
      updatedAt: header.height,
    });
  }

  return operatorReward;
}
