import { decodeAddress } from "@polkadot/util-crypto";
import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import { randomUUID } from "crypto";
import {
  baseEntry,
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
  Reward,
  StaticData,
} from "../types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  const blockNumber = block.block.header.number.toNumber();
  // if (blockNumber === 0) {
  //  const campaignsCreated = await Promise.all(
  //    campaigns.map((campaign) =>
  //      checkAndGetCampaign(campaign.id, campaign.name, blockNumber)
  //    )
  //  );
  //  await Promise.all([campaignsCreated.map((campaign) => campaign.save())]);

  //   const staticDataAdded = await StaticData.get("0");
  //   if (!staticDataAdded || staticDataAdded.added === false)
  //     await loadStaticData();
  // }
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  // Do something with a call handler here
}

export async function handleFarmerEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New event (${
      event.event.method
    }) at block ${event.block.block.header.number.toString()}`
  );
  // Get data from the event
  const {
    event: {
      data: [rewardAddress, rewardAmount],
    },
  } = event;
  const blockNumber: number = event.block.block.header.number.toNumber();
  const accountPerCampaign = await checkAndGetAccountPerCampaign(
    rewardAddress.toString(),
    CampaignIds.Gemini3g,
    blockNumber
  );
  accountPerCampaign.totalEarningsAmountTestnetToken += BigInt(
    rewardAmount.toString()
  );
  accountPerCampaign.updatedAt = blockNumber;
  await accountPerCampaign.save();

  // Create the new reward entity
  const reward = Reward.create({
    id: `${event.block.block.header.number.toNumber()}-${event.idx}`,
    campaignId: CampaignIds.Gemini3g,
    accountId: rewardAddress.toString(),
    amount: BigInt(rewardAmount.toString()),
    ...dateEntry(blockNumber),
  });
  await Promise.all([reward.save()]);
}

export async function handleOperatorEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New event (${
      event.event.method
    }) at block ${event.block.block.header.number.toString()}`
  );
  // Get data from the event
  const {
    event: { data },
  } = event;

  logger.info("data: " + data.toString());
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
  let campaign = await Campaign.get(campaignId);
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
  let account = await Account.get(accountId);
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
  let accountPerCampaign = await AccountPerCampaign.get(id);
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

// export const loadStaticData = async () => {
//   const { rewardsMap } = await import("../constants/rewards");

//   const campaigns = await Promise.all([
//     Campaign.get(CampaignIds.Aries),
//     Campaign.get(CampaignIds.Gemini1),
//     Campaign.get(CampaignIds.Gemini21),
//     Campaign.get(CampaignIds.Gemini22),
//     Campaign.get(CampaignIds.Gemini3f),
//   ]);
//   if (campaigns.some((campaign) => !campaign))
//     throw new Error("Campaigns not found");

//   const campaignMap = {
//     [CampaignIds.Aries]: campaigns[0],
//     [CampaignIds.Gemini1]: campaigns[1],
//     [CampaignIds.Gemini21]: campaigns[2],
//     [CampaignIds.Gemini22]: campaigns[3],
//     [CampaignIds.Gemini3f]: campaigns[4],
//   };

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

//   const staticDataAdded = StaticData.create({
//     id: "0",
//     added: true,
//   });
//   await Promise.all([staticDataAdded.save()]);
// };
