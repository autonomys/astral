import { randomUUID } from "crypto";
import { parseEther } from "ethers";
import fs from "fs/promises";
import {
  Account,
  AccountPerCampaign,
  Campaign,
  Reward,
  StaticData,
} from "./model";
import { Cache } from "./utils/cache";

const OLD_REWARDS_FILE_PATH = "static/rewards.csv";
const GEMINI_3G_REWARDS_FILE_PATH = "static/gemini-3f-rewards.csv";

const campaignIds = {
  aries: "aries",
  "gemini-1": "gemini-1",
  "gemini-2.1": "gemini-2.1",
  "gemini-2.2": "gemini-2.2",
  "gemini-3g": "gemini-3g",
};

const parseCSV = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const rows = data.split("\n").map((row) => row.split(","));
    const headers = rows[0].map((header) => header.replace("\r", ""));
    return rows.slice(1).map((row) => {
      const obj: { [key: string]: string } = {};
      row.forEach((value, index) => {
        if (value && headers[index])
          obj[headers[index]] = value.replace("\r", "");
      });
      return obj;
    });
  } catch (error) {
    console.error("Error parsing CSV file", error);
    return [];
  }
};

export const loadStaticData = async (cache: Cache) => {
  const campaign1 = new Campaign({
    id: campaignIds.aries,
    name: "Aries",
    totalEarningsAmountATCToken: BigInt(0),
    totalEarningsPercentageATCToken: BigInt(0),
    totalEarningsAmountTestnetToken: BigInt(0),
    totalEarningsPercentageTestnetToken: BigInt(0),
    createdAt: 0,
    updatedAt: 0,
  });
  cache.campaigns.set(campaign1.id, campaign1);

  const campaign2 = new Campaign({
    id: campaignIds["gemini-1"],
    name: "Gemini 1",
    totalEarningsAmountATCToken: BigInt(0),
    totalEarningsPercentageATCToken: BigInt(0),
    totalEarningsAmountTestnetToken: BigInt(0),
    totalEarningsPercentageTestnetToken: BigInt(0),
    createdAt: 0,
    updatedAt: 0,
  });
  cache.campaigns.set(campaign2.id, campaign2);

  const campaign3 = new Campaign({
    id: campaignIds["gemini-2.1"],
    name: "Gemini 2.1",
    totalEarningsAmountATCToken: BigInt(0),
    totalEarningsPercentageATCToken: BigInt(0),
    totalEarningsAmountTestnetToken: BigInt(0),
    totalEarningsPercentageTestnetToken: BigInt(0),
    createdAt: 0,
    updatedAt: 0,
  });
  cache.campaigns.set(campaign3.id, campaign3);

  const campaign4 = new Campaign({
    id: campaignIds["gemini-2.2"],
    name: "Gemini 2.2",
    totalEarningsAmountATCToken: BigInt(0),
    totalEarningsPercentageATCToken: BigInt(0),
    totalEarningsAmountTestnetToken: BigInt(0),
    totalEarningsPercentageTestnetToken: BigInt(0),
    createdAt: 0,
    updatedAt: 0,
  });
  cache.campaigns.set(campaign4.id, campaign4);

  // Load and process Old Rewards CSV file
  const oldRewardsData = await parseCSV(OLD_REWARDS_FILE_PATH);
  oldRewardsData.forEach((row) => {
    try {
      if (
        row.accountId &&
        row.accountId !== "" &&
        row.accountId.startsWith("st")
      ) {
        const rewards = {
          aries: BigInt(
            row.aries_blocks_won && row.aries_blocks_won !== ""
              ? parseEther(row.aries_blocks_won)
              : "0"
          ),
          gemini1: BigInt(
            row.gemini1_tssc_earned && row.gemini1_tssc_earned !== ""
              ? parseEther(row.gemini1_tssc_earned)
              : "0"
          ),
          gemini21: BigInt(
            row.gemini21_tssc_earned && row.gemini21_tssc_earned !== ""
              ? parseEther(row.gemini21_tssc_earned)
              : "0"
          ),
          gemini22: BigInt(
            row.gemini22_tssc_earned && row.gemini22_tssc_earned !== ""
              ? parseEther(row.gemini22_tssc_earned)
              : "0"
          ),
        };

        if (rewards.aries > BigInt(0)) {
          const reward1 = new Reward({
            id: randomUUID(),
            campaignId: campaign1.id,
            accountId: row.accountId,
            amount: rewards.aries,
            createdAt: 0,
            updatedAt: 0,
          });
          cache.rewards.set(reward1.id, reward1);

          const accountPerCampaign1 = new AccountPerCampaign({
            id: row.accountId + "-" + campaign1.id,
            accountId: row.accountId,
            campaignId: campaign1.id,
            totalEarningsAmountTestnetToken: rewards.aries,
            totalEarningsPercentageTestnetToken: BigInt(0),
            totalEarningsAmountATCToken: BigInt(0),
            totalEarningsPercentageATCToken: BigInt(0),
            rank: BigInt(0),
            createdAt: 0,
            updatedAt: 0,
          });

          cache.accountPerCampaigns.set(
            accountPerCampaign1.id,
            accountPerCampaign1
          );

          campaign1.totalEarningsAmountTestnetToken += rewards.aries;
          cache.campaigns.set(campaign1.id, campaign1);

          // Create or update Account entity
          let account1 = cache.accounts.get(row.accountId);
          if (!account1) {
            account1 = new Account({
              id: row.accountId,
              totalCampaignsParticipated: BigInt(1),
              totalEarningsAmountTestnetToken: rewards.aries,
              totalEarningsPercentageTestnetToken: BigInt(0),
              totalEarningsAmountATCToken: BigInt(0),
              totalEarningsPercentageATCToken: BigInt(0),
              rank: BigInt(0),
              createdAt: 0,
              updatedAt: 0,
            });
          } else {
            account1.totalCampaignsParticipated += BigInt(1);
            account1.totalEarningsAmountTestnetToken += rewards.aries;
          }
          cache.accounts.set(account1.id, account1);
        }

        if (rewards.gemini1 > BigInt(0)) {
          const reward2 = new Reward({
            id: randomUUID(),
            campaignId: campaign2.id,
            accountId: row.accountId,
            amount: rewards.gemini1,
            createdAt: 0,
            updatedAt: 0,
          });
          cache.rewards.set(reward2.id, reward2);

          const accountPerCampaign2 = new AccountPerCampaign({
            id: row.accountId + "-" + campaign2.id,
            accountId: row.accountId,
            campaignId: campaign2.id,
            totalEarningsAmountTestnetToken: rewards.gemini1,
            totalEarningsPercentageTestnetToken: BigInt(0),
            totalEarningsAmountATCToken: BigInt(0),
            totalEarningsPercentageATCToken: BigInt(0),
            rank: BigInt(0),
            createdAt: 0,
            updatedAt: 0,
          });

          cache.accountPerCampaigns.set(
            accountPerCampaign2.id,
            accountPerCampaign2
          );

          campaign2.totalEarningsAmountTestnetToken += rewards.gemini1;
          cache.campaigns.set(campaign2.id, campaign2);

          // Create or update Account entity
          let account2 = cache.accounts.get(row.accountId);
          if (!account2) {
            account2 = new Account({
              id: row.accountId,
              totalCampaignsParticipated: BigInt(1),
              totalEarningsAmountTestnetToken: rewards.gemini1,
              totalEarningsPercentageTestnetToken: BigInt(0),
              totalEarningsAmountATCToken: BigInt(0),
              totalEarningsPercentageATCToken: BigInt(0),
              rank: BigInt(0),
              createdAt: 0,
              updatedAt: 0,
            });
          } else {
            account2.totalCampaignsParticipated += BigInt(1);
            account2.totalEarningsAmountTestnetToken += rewards.gemini1;
          }
          cache.accounts.set(account2.id, account2);
        }

        if (rewards.gemini21 > BigInt(0)) {
          const reward3 = new Reward({
            id: randomUUID(),
            campaignId: campaign3.id,
            accountId: row.accountId,
            amount: rewards.gemini21,
            createdAt: 0,
            updatedAt: 0,
          });
          cache.rewards.set(reward3.id, reward3);

          const accountPerCampaign3 = new AccountPerCampaign({
            id: row.accountId + "-" + campaign3.id,
            accountId: row.accountId,
            campaignId: campaign3.id,
            totalEarningsAmountTestnetToken: rewards.gemini21,
            totalEarningsPercentageTestnetToken: BigInt(0),
            totalEarningsAmountATCToken: BigInt(0),
            totalEarningsPercentageATCToken: BigInt(0),
            rank: BigInt(0),
            createdAt: 0,
            updatedAt: 0,
          });

          cache.accountPerCampaigns.set(
            accountPerCampaign3.id,
            accountPerCampaign3
          );

          campaign3.totalEarningsAmountTestnetToken += rewards.gemini21;
          cache.campaigns.set(campaign3.id, campaign3);

          // Create or update Account entity
          let account3 = cache.accounts.get(row.accountId);
          if (!account3) {
            account3 = new Account({
              id: row.accountId,
              totalCampaignsParticipated: BigInt(1),
              totalEarningsAmountTestnetToken: rewards.gemini21,
              totalEarningsPercentageTestnetToken: BigInt(0),
              totalEarningsAmountATCToken: BigInt(0),
              totalEarningsPercentageATCToken: BigInt(0),
              rank: BigInt(0),
              createdAt: 0,
              updatedAt: 0,
            });
          } else {
            account3.totalCampaignsParticipated += BigInt(1);
            account3.totalEarningsAmountTestnetToken += rewards.gemini21;
          }
          cache.accounts.set(account3.id, account3);
        }

        if (rewards.gemini22 > BigInt(0)) {
          const reward4 = new Reward({
            id: randomUUID(),
            campaignId: campaign4.id,
            accountId: row.accountId,
            amount: rewards.gemini22,
            createdAt: 0,
            updatedAt: 0,
          });
          cache.rewards.set(reward4.id, reward4);

          const accountPerCampaign4 = new AccountPerCampaign({
            id: row.accountId + "-" + campaign4.id,
            accountId: row.accountId,
            campaignId: campaign4.id,
            totalEarningsAmountTestnetToken: rewards.gemini22,
            totalEarningsPercentageTestnetToken: BigInt(0),
            totalEarningsAmountATCToken: BigInt(0),
            totalEarningsPercentageATCToken: BigInt(0),
            rank: BigInt(0),
            createdAt: 0,
            updatedAt: 0,
          });

          cache.accountPerCampaigns.set(
            accountPerCampaign4.id,
            accountPerCampaign4
          );

          campaign4.totalEarningsAmountTestnetToken += rewards.gemini22;
          cache.campaigns.set(campaign4.id, campaign4);

          // Create or update Account entity
          let account4 = cache.accounts.get(row.accountId);
          if (!account4) {
            account4 = new Account({
              id: row.accountId,
              totalCampaignsParticipated: BigInt(1),
              totalEarningsAmountTestnetToken: rewards.gemini22,
              totalEarningsPercentageTestnetToken: BigInt(0),
              totalEarningsAmountATCToken: BigInt(0),
              totalEarningsPercentageATCToken: BigInt(0),
              rank: BigInt(0),
              createdAt: 0,
              updatedAt: 0,
            });
          } else {
            account4.totalCampaignsParticipated += BigInt(1);
            account4.totalEarningsAmountTestnetToken += rewards.gemini22;
          }
          cache.accounts.set(account4.id, account4);
        }
      }
    } catch (error) {
      console.error("Error processing row", row, error);
    }
  });
  console.log("Old Rewards CSV file successfully processed");
  cache.isModified = true;

  const campaign5 = new Campaign({
    id: campaignIds["gemini-3g"],
    name: "Gemini 3G",
    totalEarningsAmountATCToken: BigInt(0),
    totalEarningsPercentageATCToken: BigInt(0),
    totalEarningsAmountTestnetToken: BigInt(0),
    totalEarningsPercentageTestnetToken: BigInt(0),
    createdAt: 0,
    updatedAt: 0,
  });
  cache.campaigns.set(campaign5.id, campaign5);

  // Load and process Gemini 3G CSV file
  const gemini3GData = await parseCSV(GEMINI_3G_REWARDS_FILE_PATH);
  gemini3GData.forEach((row) => {
    try {
      if (
        row.accountId &&
        row.accountId !== "" &&
        row.accountId.startsWith("st")
      ) {
        const reward = BigInt(parseEther(row.rewards));

        const reward5 = new Reward({
          id: randomUUID(),
          campaignId: campaign5.id,
          accountId: row.accountId,
          amount: reward,
          createdAt: 0,
          updatedAt: 0,
        });
        cache.rewards.set(reward5.id, reward5);

        const accountPerCampaign5 = new AccountPerCampaign({
          id: row.accountId + "-" + campaign5.id,
          accountId: row.accountId,
          campaignId: campaign5.id,
          totalEarningsAmountTestnetToken: reward,
          totalEarningsPercentageTestnetToken: BigInt(0),
          totalEarningsAmountATCToken: BigInt(0),
          totalEarningsPercentageATCToken: BigInt(0),
          rank: BigInt(0),
          createdAt: 0,
          updatedAt: 0,
        });

        cache.accountPerCampaigns.set(
          accountPerCampaign5.id,
          accountPerCampaign5
        );

        campaign5.totalEarningsAmountTestnetToken += reward;
        cache.campaigns.set(campaign5.id, campaign5);

        // Create or update Account entity
        let account5 = cache.accounts.get(row.accountId);
        if (!account5) {
          account5 = new Account({
            id: row.accountId,
            totalCampaignsParticipated: BigInt(1),
            totalEarningsAmountTestnetToken: reward,
            totalEarningsPercentageTestnetToken: BigInt(0),
            totalEarningsAmountATCToken: BigInt(0),
            totalEarningsPercentageATCToken: BigInt(0),
            rank: BigInt(0),
            createdAt: 0,
            updatedAt: 0,
          });
        } else {
          account5.totalCampaignsParticipated += BigInt(1);
          account5.totalEarningsAmountTestnetToken += reward;
        }
        cache.accounts.set(account5.id, account5);
      }
    } catch (error) {
      console.error("Error processing row (2)", row, error);
    }
  });
  console.log("Gemini 3G CSV file successfully processed");

  cache.isModified = true;

  cache.staticDataAdded.set(
    "0",
    new StaticData({
      id: "0",
      added: true,
    })
  );
  cache.isModified = true;

  return cache;
};
