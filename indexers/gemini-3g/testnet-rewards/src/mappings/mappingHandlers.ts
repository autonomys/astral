import { domains } from "@autonomys/auto-consensus";
import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import { CampaignIds, campaigns } from "../constants/campaign";
import { Campaign, Nominator, Reward, StaticData } from "../types";
import {
  checkAndGetAccount,
  checkAndGetAccountPerCampaign,
  checkAndGetCampaign,
  checkAndGetDeposit,
  checkAndGetDomain,
  checkAndGetNominator,
  checkAndGetNominatorDepositState,
  checkAndGetNominatorReward,
  checkAndGetOperator,
  checkAndGetOperatorReward,
  checkAndGetOperatorState,
  checkAndGetReward,
} from "./db";
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

    await checkAndGetOperatorState(
      operatorId,
      BigInt(currentTotalStake),
      BigInt(totalShares),
      blockNumber
    );
  });

  _nominators.forEach(async ([_header, _data]) => {
    const [operatorId, accountId] = _header.toHuman() as [string, string];
    logger.info("operatorId: " + stringify(operatorId));
    logger.info("accountId: " + stringify(accountId));

    const { shares } = _data.toPrimitive() as {
      shares: string;
    };
    logger.info("shares: " + stringify(shares));

    const nominator = await Nominator.get(`${operatorId}-${accountId}`);
    logger.info("nominator: " + stringify(nominator));
    const __nominator = await Nominator.getByOperatorId(operatorId);
    logger.info("__nominator: " + stringify(__nominator));
    if (nominator) logger.info("nominator: " + stringify(nominator));
    else logger.info("nominator not found");

    await checkAndGetNominatorDepositState(
      operatorId,
      accountId,
      BigInt(shares),
      blockNumber
    );
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

  await checkAndGetAccountPerCampaign(
    rewardAddress.toString(),
    CampaignIds.Gemini3g,
    blockNumber
  );

  await checkAndGetReward(
    rewardAddress.toString(),
    CampaignIds.Gemini3g,
    BigInt(rewardAmount.toString()),
    blockNumber
  );
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

  await checkAndGetDomain(domainId.toString(), blockNumber);
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

  await checkAndGetDomain(domainId.toString(), blockNumber);

  await checkAndGetAccount(signer, blockNumber);

  await checkAndGetOperator(
    operatorId.toString(),
    domainId.toString(),
    signer,
    blockNumber
  );

  await checkAndGetNominator(
    signer,
    domainId.toString(),
    operatorId.toString(),
    blockNumber
  );
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

  const domain = await checkAndGetDomain(operator.domainId, blockNumber);

  const operatorReward = await checkAndGetOperatorReward(
    operatorId,
    reward,
    blockNumber
  );

  if (operatorState.currentTotalShares >= BigInt(0)) {
    logger.warn("skipping nominator reward wip");

    /* const nominators = await Nominator.getByOperatorId(operatorId);
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
        } else
          logger.warn(
            "Current total shares is less than reward * nominator.currentTotalShares"
          );
      }
    }*/
  } else logger.warn("Current total shares is 0");
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
