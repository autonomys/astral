import { domains } from "@autonomys/auto-consensus";
import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import { CampaignIds, campaigns } from "../constants/campaign";
import {
  Campaign,
  Nominator,
  NominatorDepositState,
  OperatorState,
  StaticData,
} from "../types";
import {
  checkAndGetAccount,
  checkAndGetAccountPerCampaign,
  checkAndGetCampaign,
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
  getExtrinsicCall,
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

  const operatorIdOwner = _operatorIdOwner.map(([key, value]) => {
    const [operatorId] = key.toHuman() as [string];
    const owner = value.toHuman();
    return { operatorId, owner };
  });

  _operators.forEach(async ([_header, _data]) => {
    const [operatorId] = _header.toHuman() as [string];

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

    const owner = operatorIdOwner.find(
      (operator) => operator.operatorId === operatorId
    )?.owner;

    await checkAndGetOperator(
      operatorId,
      currentDomainId.toString(),
      owner?.toString() || "0x",
      blockNumber
    );
    await checkAndGetOperatorState(
      operatorId,
      BigInt(currentTotalStake),
      BigInt(totalShares),
      blockNumber
    );
  });

  _nominators.forEach(async ([_header, _data]) => {
    const [operatorId, accountId] = _header.toHuman() as [string, string];
    const { shares } = _data.toPrimitive() as { shares: string };

    await checkAndGetNominator(accountId, operatorId, "-1", blockNumber);
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
    await Promise.all([campaignsCreated.map((campaign) => campaign.save())]);

    const staticDataAdded = await StaticData.get("0");
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

  const args = getExtrinsicCall(extrinsic);
  logger.info("args: " + stringify(args));

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
    operatorId.toString(),
    domainId.toString(),
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
    operatorId.toString(),
    operator.domainId,
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
  if (_reward.toString() !== "0")
    logger.info(
      `New event (${method}) at block ${blockNumber.toString()} ${_reward.toString()}`
    );
  else return;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());

  const operator = await checkAndGetOperator(
    operatorId,
    "0",
    "0x",
    blockNumber
  );

  await checkAndGetDomain(operator.domainId, blockNumber);

  await checkAndGetOperatorReward(operatorId, reward, blockNumber);

  const [_operators, _nominators] = await Promise.all([
    api.query.domains.operators.entries(),
    api.query.domains.nominators.entries(),
  ]);

  logger.info("_operators" + stringify(_operators));
  logger.info("_nominators" + stringify(_nominators));

  const operatorState = _operators
    .map(([_header, _data]) => {
      const [operatorId] = _header.toHuman() as [string];

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
        "operatorId: " +
          stringify({ operatorId }) +
          " currentTotalStake: " +
          stringify({ currentTotalStake }) +
          " totalShares: " +
          stringify({ totalShares })
      );
      return { operatorId, currentDomainId, currentTotalStake, totalShares };
    })
    .find((op) => op.operatorId === operatorId);
  logger.info("___operators" + stringify(operatorState));

  if (operatorState) {
    const operatorTotalShares = BigInt(operatorState.totalShares);
    if (operatorTotalShares >= BigInt(0)) {
      _nominators.forEach(async ([_header, _data]) => {
        const [_nOpId, accountId] = _header.toHuman() as [string, string];
        if (operatorId !== _nOpId) return;
        const { shares } = _data.toPrimitive() as { shares: string };
        const nominatorShares = BigInt(shares);

        logger.info(
          "operatorId: " +
            stringify({ _nOpId }) +
            " accountId: " +
            stringify({ accountId }) +
            " shares: " +
            stringify({ shares })
        );
        const rewardTimeTotalShare = reward * operatorTotalShares;

        if (rewardTimeTotalShare >= nominatorShares) {
          const nominatorRewardAmount = rewardTimeTotalShare / nominatorShares;

          const nominatorReward = await checkAndGetNominatorReward(
            `${operatorId}-${accountId}`,
            operatorId,
            nominatorRewardAmount,
            reward,
            operatorTotalShares,
            nominatorShares,
            blockNumber
          );
          logger.info("nominatorReward: " + nominatorReward.toString());
        } else logger.warn("Current total shares is 0");
      });
    }
  }
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
