import { randomUUID } from "crypto";
import {
  CampaignIds,
  defaultAccount,
  defaultAccountPerCampaign,
  defaultCampaign,
} from "../constants/campaign";
import {
  Account,
  AccountPerCampaign,
  Campaign,
  Deposit,
  Domain,
  Nominator,
  NominatorDepositState,
  NominatorReward,
  Operator,
  OperatorReward,
  OperatorState,
  Reward,
} from "../types";
import { dateEntry, stringify } from "./utils";

export async function checkAndGetCampaign(
  campaignId: CampaignIds,
  name: string,
  blockNumber: number
): Promise<Campaign> {
  const campaigns = await Campaign.getByFields([["id", "=", campaignId]]);
  let campaign = campaigns ? campaigns[0] : undefined;
  if (!campaign) {
    campaign = Campaign.create({
      ...defaultCampaign,
      id: campaignId,
      campaignId,
      name,
      ...dateEntry(blockNumber),
    });
    await campaign.save();
  }
  return campaign;
}

export async function checkAndGetAccount(
  accountId: string,
  blockNumber: number
): Promise<Account> {
  const accounts = await Account.getByFields([["id", "=", accountId]]);
  let account = accounts ? accounts[0] : undefined;
  if (!account) {
    account = Account.create({
      ...defaultAccount,
      id: accountId,
      accountId,
      ...dateEntry(blockNumber),
    });
    await account.save();
  }
  return account;
}

export async function checkAndGetAccountPerCampaign(
  accountId: string,
  campaignId: CampaignIds,
  blockNumber: number
): Promise<AccountPerCampaign> {
  const id = accountId + "-" + campaignId;
  const accountPerCampaigns = await AccountPerCampaign.getByFields([
    ["id", "=", id],
  ]);
  let accountPerCampaign = accountPerCampaigns
    ? accountPerCampaigns[0]
    : undefined;
  if (!accountPerCampaign) {
    accountPerCampaign = AccountPerCampaign.create({
      ...defaultAccountPerCampaign,
      id,
      accountId,
      campaignId,
      ...dateEntry(blockNumber),
    });
  }
  return accountPerCampaign;
}

export async function checkAndGetDomain(
  domainId: string,
  blockNumber: number
): Promise<Domain> {
  const id = `${domainId}`;
  const domains = await Domain.getByDomainId(id);
  let domain = domains ? domains[0] : undefined;
  if (!domain) {
    domain = Domain.create({
      id,
      domainId,
      ...dateEntry(blockNumber),
    });
    await domain.save();
  }
  return domain;
}

export async function checkAndGetOperator(
  operatorId: string,
  domainId: string,
  accountId: string,
  blockNumber: number
): Promise<Operator> {
  const id = `${operatorId}`;
  const operators = await Operator.getByOperatorId(id);
  let operator = operators ? operators[0] : undefined;
  if (!operator) {
    operator = Operator.create({
      id,
      operatorId,
      domainId,
      accountId,
      ...dateEntry(blockNumber),
    });
    await operator.save();
  }
  return operator;
}

export async function checkAndGetOperatorState(
  operatorId: string,
  currentTotalShares: bigint,
  currentTotalStake: bigint,
  blockNumber: number
): Promise<OperatorState> {
  const id = `${blockNumber}-${operatorId}`;
  let operatorState = await OperatorState.get(id);
  if (!operatorState) {
    operatorState = OperatorState.create({
      id,
      operatorId,
      currentTotalShares,
      currentTotalStake,
      ...dateEntry(blockNumber),
    });
    await operatorState.save();
  }
  return operatorState;
}

export async function checkAndGetNominator(
  accountId: string,
  operatorId: string,
  domainId: string,
  blockNumber: number
): Promise<Nominator> {
  const nominatorId = `${operatorId}-${accountId}`;
  const nominatorRewards = await Nominator.getByNominatorId(nominatorId);
  let nominator = nominatorRewards ? nominatorRewards[0] : undefined;
  if (!nominator) {
    nominator = Nominator.create({
      id: randomUUID(),
      nominatorId,
      accountId,
      domainId,
      operatorId,
      ...dateEntry(blockNumber),
    });
    await nominator.save();
  }
  return nominator;
}
export async function checkAndGetDeposit(
  accountId: string,
  domainId: string,
  operatorId: string,
  nominatorId: string,
  amount: bigint,
  blockNumber: number
): Promise<Deposit> {
  const id = `${blockNumber}-${nominatorId}`;
  const deposits = await Deposit.getByFields([["id", "=", id]]);
  let deposit = deposits ? deposits[0] : undefined;
  if (!deposit) {
    deposit = Deposit.create({
      id,
      accountId,
      domainId,
      operatorId,
      nominatorId,
      amount,
      ...dateEntry(blockNumber),
    });
    await deposit.save();
  }
  return deposit;
}

export async function checkAndGetNominatorDepositState(
  operatorId: string,
  accountId: string,
  shares: bigint,
  blockNumber: number
): Promise<NominatorDepositState> {
  const id = `${blockNumber}-${operatorId}-${accountId}`;
  let nominatorDepositState = await NominatorDepositState.get(id);
  if (!nominatorDepositState) {
    nominatorDepositState = NominatorDepositState.create({
      id,
      accountId,
      operatorId,
      nominatorId: `${operatorId}-${accountId}`,
      shares,
      ...dateEntry(blockNumber),
    });
    await nominatorDepositState.save();
  }
  return nominatorDepositState;
}

export async function checkAndGetOperatorReward(
  operatorId: string,
  amount: bigint,
  blockNumber: number
): Promise<OperatorReward> {
  const id = `${blockNumber}-${operatorId}`;
  const operatorRewards = await OperatorReward.getByFields([["id", "=", id]]);
  let operatorReward = operatorRewards ? operatorRewards[0] : undefined;
  if (!operatorReward) {
    operatorReward = OperatorReward.create({
      id,
      operatorId,
      amount,
      ...dateEntry(blockNumber),
    });
    await operatorReward.save();
  }
  return operatorReward;
}

export async function checkAndGetNominatorReward(
  nominatorId: string,
  operatorId: string,
  amount: bigint,
  operatorReward: bigint,
  operatorCurrentTotalShares: bigint,
  nominatorCurrentShares: bigint,
  blockNumber: number
): Promise<NominatorReward> {
  const id = `${blockNumber}-${nominatorId}`;
  const nominatorRewards = await NominatorReward.getByFields([["id", "=", id]]);
  let nominatorReward = nominatorRewards ? nominatorRewards[0] : undefined;
  if (!nominatorReward) {
    nominatorReward = NominatorReward.create({
      id,
      nominatorId,
      operatorId,
      amount,
      operatorReward,
      operatorCurrentTotalShares,
      nominatorCurrentShares,
      ...dateEntry(blockNumber),
    });
    await nominatorReward.save();
  }
  return nominatorReward;
}

export async function checkAndGetReward(
  accountId: string,
  campaignId: string,
  amount: bigint,
  blockNumber: number
): Promise<Reward> {
  const id = `${accountId}-${campaignId}-${blockNumber}`;
  let reward = await Reward.get(id);
  if (!reward) {
    reward = Reward.create({
      id,
      campaignId,
      accountId,
      amount,
      ...dateEntry(blockNumber),
    });
    await reward.save();
  }
  return reward;
}
