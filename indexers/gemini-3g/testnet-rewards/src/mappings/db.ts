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
  const domains = await Domain.getByFields([["id", "=", domainId]]);
  let domain = domains ? domains[0] : undefined;
  if (!domain) {
    domain = Domain.create({
      id: domainId,
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
  logger.info(
    "checkAndGetOperator is called with: " +
      stringify({ operatorId, domainId, accountId, blockNumber })
  );
  const id = `${operatorId}`;
  logger.info("id: " + id);

  let operator = await Operator.get(id);
  logger.info("operator: " + stringify(operator));

  if (!operator) {
    logger.info("Creating new operator");
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
  logger.info(
    "checkAndGetOperatorState is called with: " +
      stringify({
        operatorId,
        currentTotalShares,
        currentTotalStake,
        blockNumber,
      })
  );
  const id = `${operatorId}-${blockNumber}`;
  logger.info("id: " + id);

  let operatorState = await OperatorState.get(id);
  logger.info("operatorState: " + stringify(operatorState));

  if (!operatorState) {
    logger.info("Creating new operatorState");
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
  domainId: string,
  operatorId: string,
  blockNumber: number
): Promise<Nominator> {
  const id = `${operatorId}-${accountId}`;
  const nominatorRewards = await Nominator.getByFields([["id", "=", id]]);
  let nominator = nominatorRewards ? nominatorRewards[0] : undefined;
  if (!nominator) {
    nominator = Nominator.create({
      id,
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
  const id = `${accountId}-${domainId}-${operatorId}-${nominatorId}-${blockNumber}`;
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
  const id = `${operatorId}-${accountId}-${blockNumber}`;
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
  const id = `${operatorId}-${blockNumber}`;
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
  blockNumber: number
): Promise<NominatorReward> {
  const id = `${nominatorId}-${operatorId}-${blockNumber}`;
  const nominatorRewards = await NominatorReward.getByFields([["id", "=", id]]);
  let nominatorReward = nominatorRewards ? nominatorRewards[0] : undefined;
  if (!nominatorReward) {
    nominatorReward = NominatorReward.create({
      id,
      nominatorId,
      operatorId,
      amount,
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
