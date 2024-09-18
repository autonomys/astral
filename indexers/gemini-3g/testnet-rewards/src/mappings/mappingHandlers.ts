import { deposits, domains, operators } from "@autonomys/auto-consensus";
import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import {
  CampaignIds,
  campaigns,
  defaultAccount,
  defaultAccountPerCampaign,
  defaultCampaign,
} from "../constants/campaign";
import {
  Account,
  AccountPerCampaign,
  Campaign,
  Domain,
  Nominator,
  NominatorReward,
  Operator,
  OperatorReward,
  OperatorState,
  Reward,
  StaticData,
} from "../types";
import {
  getBlockNumberFromBlock,
  getBlockNumberFromEvent,
  getSignedExtrinsicCallArgs,
  stringify,
} from "./utils";

export async function updateData(blockNumber: number) {
  const [_domains, _operators, _operatorIdOwner, _nominators] =
    await Promise.all([
      domains(api as any),
      api.query.domains.operators.entries(),
      api.query.domains.operatorIdOwner.entries(),
      api.query.domains.nominators.entries(),
    ]);
  logger.info("_domains: " + stringify(_domains));
  logger.info("_operators: " + stringify(_operators));
  logger.info("_operatorIdOwner: " + stringify(_operatorIdOwner));
  logger.info("_nominators: " + stringify(_nominators));

  const operatorIdOwner = _operatorIdOwner.map(([key, value]) => {
    const [operatorId] = key.toHuman() as [string];
    const owner = value.toHuman();
    return { operatorId, owner };
  });
  logger.info("operatorIdOwner: " + stringify(operatorIdOwner));

  _operators.forEach(async ([_header, _data]) => {
    const [operatorId] = _header.toHuman() as [string];
    logger.info("operatorId: " + stringify(operatorId));

    const { currentDomainId, currentTotalStake, totalShares } =
      _data.toPrimitive() as {
        signingKey: string;
        currentDomainId: number;
        nextDomainId: number;
        minimumNominatorStake: string;
        nominationTax: number;
        currentTotalStake: string;
        currentEpochRewards: number;
        totalShares: string;
        status: string;
      };
    logger.info(
      "operatorData: " +
        stringify({
          currentDomainId,
          currentTotalStake,
          totalShares,
        })
    );

    const owner = operatorIdOwner.find(
      (operator) => operator.operatorId === operatorId
    )?.owner;
    logger.info("owner: " + stringify(owner));

    const operatorState = await checkAndGetOperatorState(
      operatorId,
      BigInt(0),
      BigInt(0),
      blockNumber
    );
    if (operatorState) {
      operatorState.currentTotalShares = BigInt(totalShares);
      operatorState.currentTotalStake = BigInt(currentTotalStake);
      await operatorState.save();
      logger.info("Operator saved: " + operatorId);
    } else logger.warn("Operator not found: " + operatorId);
  });

  _nominators.forEach(async ([_header, _data]) => {
    const [operatorId, nominatorId] = _header.toHuman() as [string, string];
    logger.info("operatorId: " + stringify(operatorId));
    logger.info("nominatorId: " + stringify(nominatorId));

    const { shares } = _data.toPrimitive() as {
      shares: string;
    };
    logger.info("shares: " + stringify(shares));

    const nominator = await checkAndGetNominator(
      nominatorId,
      "0",
      operatorId,
      blockNumber
    );
    nominator.currentTotalShares = BigInt(shares);
    await nominator.save();
  });
}

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  const blockNumber = getBlockNumberFromBlock(block);

  await updateData(blockNumber);

  logger.info(`blockNumber: ${blockNumber}`);
  if (blockNumber === 100) {
    const campaignsCreated = await Promise.all(
      campaigns.map((campaign) =>
        checkAndGetCampaign(campaign.id, campaign.name, blockNumber)
      )
    );
    logger.info(`campaignsCreated: ${campaignsCreated}`);
    await Promise.all([campaignsCreated.map((campaign) => campaign.save())]);

    const staticDataAdded = await StaticData.get("0");
    logger.info(`staticDataAdded: ${staticDataAdded}`);
    if (!staticDataAdded || staticDataAdded.added === false)
      await loadStaticData();
  }
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  // Do something with a call handler here
}

export async function handleFarmerEvent(event: SubstrateEvent): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      data: [rewardAddress, rewardAmount],
    },
  } = event;

  const accountPerCampaign = await checkAndGetAccountPerCampaign(
    rewardAddress.toString(),
    CampaignIds.Gemini3g,
    blockNumber
  );
  accountPerCampaign.totalEarningsAmountTestnetToken += BigInt(
    rewardAmount.toString()
  );
  accountPerCampaign.updatedAt = blockNumber;

  const reward = Reward.create({
    id: `${event.block.block.header.number.toNumber()}-${event.idx}`,
    campaignId: CampaignIds.Gemini3g,
    accountId: rewardAddress.toString(),
    amount: BigInt(rewardAmount.toString()),
    ...dateEntry(blockNumber),
  });

  await Promise.all([accountPerCampaign.save(), reward.save()]);
}

export async function handleDomainInstantiatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      data: [domainId],
    },
    extrinsic,
  } = event;

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const domain = await checkAndGetDomain(domainId.toString(), blockNumber);

  await Promise.all([domain.save()]);
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [domainId, operatorId],
    },
    extrinsic,
  } = event;
  logger.info(`New event (${method}) at block ${blockNumber.toString()}`);

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const { signer, args } = getSignedExtrinsicCallArgs(extrinsic);
  logger.info("signer: " + signer);
  logger.info("args: " + stringify(args));

  const amount = args.amount;
  logger.info("amount: " + amount.toString());

  const domain = await checkAndGetDomain(domainId.toString(), blockNumber);

  const account = await checkAndGetAccount(signer, blockNumber);

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    domainId.toString(),
    signer,
    blockNumber
  );

  const nominator = await checkAndGetNominator(
    signer,
    domainId.toString(),
    operatorId.toString(),
    blockNumber
  );

  await Promise.all([
    domain.save(),
    account.save(),
    operator.save(),
    nominator.save(),
  ]);
}

export async function handleOperatorDeregisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [operatorId],
    },
    extrinsic,
  } = event;
  logger.info(`New event (${method}) at block ${blockNumber.toString()}`);

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    "0",
    "0x",
    blockNumber
  );
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);

  await Promise.all([domain.save(), operator.save()]);
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [operatorId, nominatorId],
    },
    extrinsic,
  } = event;
  logger.info(`New event (${method}) at block ${blockNumber.toString()}`);

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const { signer, args } = getSignedExtrinsicCallArgs(extrinsic);
  logger.info("signer: " + signer);
  logger.info("args: " + stringify(args));

  const amount = args.amount;
  logger.info("amount: " + amount.toString());

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    "0",
    signer,
    blockNumber
  );
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);

  const account = await checkAndGetAccount(signer, blockNumber);

  const nominator = await checkAndGetNominator(
    signer,
    operator.domainId,
    operatorId.toString(),
    blockNumber
  );

  await Promise.all([
    domain.save(),
    account.save(),
    operator.save(),
    nominator.save(),
  ]);
}

export async function handleWithdrewStakeEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [operatorId, nominatorId],
    },
    extrinsic,
  } = event;
  logger.info(`New event (${method}) at block ${blockNumber.toString()}`);

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const { signer, args } = getSignedExtrinsicCallArgs(extrinsic);
  logger.info("signer: " + signer);
  logger.info("args: " + stringify(args));
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [_operatorId, _reward],
    },
  } = event;
  logger.info(
    `New event (${method}) at block ${blockNumber.toString()} ${
      _reward.toString() === "0" ? " (skipped/no-reward)" : _reward.toString()
    }`
  );
  if (_reward.toString() === "0") return;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());

  await updateData(blockNumber);

  const operator = await checkAndGetOperator(
    operatorId,
    "0",
    "0x",
    blockNumber
  );
  const operatorState = await checkAndGetOperatorState(
    operatorId,
    BigInt(0),
    BigInt(0),
    blockNumber
  );
  //operatorState.totalRewards += reward;

  const domain = await checkAndGetDomain(operator.domainId, blockNumber);
  domain.totalRewards += reward;

  const operatorReward = await checkAndGetOperatorReward(
    operatorId,
    reward,
    blockNumber
  );

  await Promise.all([operator.save(), domain.save(), operatorReward.save()]);

  if (operatorState.currentTotalShares >= BigInt(0)) {
    const nominators = await Nominator.getByOperatorId(operatorId);
    if (nominators) {
      // logger.info("nominators: " + stringify(nominators));
      for (const nominator of nominators) {
        const _nom = reward * nominator.currentTotalShares;
        if (operatorState.currentTotalShares >= _nom) {
          // logger.info("nominator: " + stringify(nominator));
          const nominatorRewardAmount = _nom / operatorState.currentTotalShares;
          logger.info(
            "nominatorRewardAmount: " + nominatorRewardAmount.toString()
          );
          const nominatorReward = await checkAndGetNominatorReward(
            nominator.id,
            operatorId,
            nominatorRewardAmount,
            blockNumber
          );
          await nominatorReward.save();
        } else
          logger.warn(
            "Current total shares is less than reward * nominator.currentTotalShares"
          );
      }
    }
  } else logger.warn("Current total shares is 0");
}

function dateEntry(blockNumber: number) {
  return {
    createdAt: blockNumber,
    updatedAt: blockNumber,
  };
}

async function checkAndGetCampaign(
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
  }
  return campaign;
}

async function checkAndGetAccount(
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
  }
  return account;
}

async function checkAndGetAccountPerCampaign(
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

async function checkAndGetDomain(
  domainId: string,
  blockNumber: number
): Promise<Domain> {
  const domains = await Domain.getByFields([["id", "=", domainId]]);
  let domain = domains ? domains[0] : undefined;
  if (!domain) {
    domain = Domain.create({
      id: domainId,
      totalDeposits: BigInt(0),
      totalWithdrawn: BigInt(0),
      totalRewards: BigInt(0),
      ...dateEntry(blockNumber),
    });
  }
  return domain;
}

async function checkAndGetOperator(
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
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return operator;
}

async function checkAndGetOperatorState(
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
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return operatorState;
}

async function checkAndGetNominator(
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
      currentTotalShares: BigInt(0),
      currentTotalStake: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawn: BigInt(0),
      totalRewards: BigInt(0),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return nominator;
}

async function checkAndGetOperatorReward(
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
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return operatorReward;
}

async function checkAndGetNominatorReward(
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
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return nominatorReward;
}

export const loadStaticData = async () => {
  // const { rewardsMap } = await import("../constants/rewards");

  const campaigns = await Promise.all([
    Campaign.get(CampaignIds.Aries),
    Campaign.get(CampaignIds.Gemini1),
    Campaign.get(CampaignIds.Gemini21),
    Campaign.get(CampaignIds.Gemini22),
    Campaign.get(CampaignIds.Gemini3f),
  ]);
  logger.info("campaigns: " + campaigns.toString());
  if (campaigns.some((campaign) => !campaign))
    throw new Error("Campaigns not found");

  const campaignMap = {
    [CampaignIds.Aries]: campaigns[0],
    [CampaignIds.Gemini1]: campaigns[1],
    [CampaignIds.Gemini21]: campaigns[2],
    [CampaignIds.Gemini22]: campaigns[3],
    [CampaignIds.Gemini3f]: campaigns[4],
  };

  //   // Load and process Previous Testnet Rewards CSV file
  //   Object.values(rewardsMap).forEach(async (row) => {
  //     try {
  //       if (row.accountId && row.accountId.startsWith("st")) {
  //         const rewards = {
  //           [CampaignIds.Aries]: BigInt(row.aries_blocks_won || "0"),
  //           [CampaignIds.Gemini1]: BigInt(row.gemini1_tssc_earned || "0"),
  //           [CampaignIds.Gemini21]: BigInt(row.gemini21_tssc_earned || "0"),
  //           [CampaignIds.Gemini22]: BigInt(row.gemini22_tssc_earned || "0"),
  //           [CampaignIds.Gemini3f]: BigInt(row.gemini3f_tssc_earned || "0"),
  //         };

  //         for (const [campaignId, amount] of Object.entries(rewards)) {
  //           if (amount > BigInt(0)) {
  //             const _campaign =
  //               campaignMap[campaignId as keyof typeof campaignMap];
  //             if (!_campaign) throw new Error("Campaign not found");

  //             const reward = Reward.create({
  //               id: randomUUID(),
  //               campaignId,
  //               accountId: row.accountId,
  //               amount,
  //               ...baseEntry,
  //             });

  //             const accountPerCampaign = await checkAndGetAccountPerCampaign(
  //               row.accountId,
  //               campaignId as CampaignIds,
  //               0
  //             );

  //             _campaign.totalEarningsAmountTestnetToken += amount;

  //             // Create or update Account entity
  //             const account = await checkAndGetAccount(row.accountId, 0);
  //             account.totalCampaignsParticipated += BigInt(1);
  //             account.totalEarningsAmountTestnetToken += amount;

  //             await Promise.all([
  //               _campaign.save(),
  //               account.save(),
  //               accountPerCampaign.save(),
  //               reward.save(),
  //             ]);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error processing row", row, error);
  //     }
  //   });
  //   console.log("Previous Testnet Rewards CSV file successfully processed");

  const staticDataAdded = StaticData.create({
    id: "0",
    added: true,
  });
  await Promise.all([staticDataAdded.save()]);
};
