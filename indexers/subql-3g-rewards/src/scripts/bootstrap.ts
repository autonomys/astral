import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { parseEther } from "viem";

const parseCSV = async (filePath: string) => {
  try {
    const data = await readFile(filePath, "utf-8");
    const rows = data.split("\n").map((row) => row.split(","));
    const headers = rows[0].map((header) => header.replace("\r", ""));
    return rows.slice(1).map((row) => {
      const obj: { [key: string]: string } = {};
      row.forEach((value, index) => {
        if (value && headers[index])
          obj[headers[index]] = value.replace("\r", "");
        if (
          obj[headers[0]] &&
          obj[headers[index]] &&
          obj[headers[0]].startsWith("st") &&
          !obj[headers[index]].startsWith("st") &&
          !isNaN(Number(obj[headers[index]])) &&
          !obj[headers[index]].endsWith("%")
        ) {
          obj[headers[index]] = parseEther(
            obj[headers[index]].toString()
          ).toString();
        }
      });
      return obj;
    });
  } catch (error) {
    console.error("Error parsing CSV file", error);
    return [];
  }
};

const csvFilePath = path.resolve(__dirname, "../src/static/rewards.csv");
const csv3FFilePath = path.resolve(
  __dirname,
  "../src/static/gemini-3f-rewards.csv"
);
const outputFilePath = path.resolve(__dirname, "../src/constants/rewards.ts");

interface Reward {
  accountId: string;
  rewards: string;
}

const rewardsMap: Record<
  string,
  {
    accountId: string;
    aries_blocks_won: string;
    gemini1_tssc_earned: string;
    gemini1_percent_tssc_earned: string;
    gemini21_tssc_earned: string;
    gemini21_percent_of_total_token_supply_earned: string;
    gemini22_tssc_earned: string;
    gemini22_percent_of_gemini_ii_tssc_farmer: string;
    gemini22_percent_of_total_token_supply_earned: string;
    gemini3f_tssc_earned: string;
  }
> = {};
const rewards3FMap: Record<string, string> = {};

(async () => {
  console.log("Generating TypeScript file...");

  const rewardsRows = await parseCSV(csvFilePath);
  const rewards3FRows = await parseCSV(csv3FFilePath);

  rewardsRows.forEach((row) => {
    const {
      accountId,
      aries_blocks_won,
      gemini1_tssc_earned,
      gemini1_percent_tssc_earned,
      gemini21_tssc_earned,
      gemini21_percent_of_total_token_supply_earned,
      gemini22_tssc_earned,
      gemini22_percent_of_gemini_ii_tssc_farmer,
      gemini22_percent_of_total_token_supply_earned,
    } = row;

    if (accountId) {
      rewardsMap[accountId] = {
        accountId,
        aries_blocks_won: aries_blocks_won ?? "0",
        gemini1_tssc_earned: gemini1_tssc_earned ?? "0",
        gemini1_percent_tssc_earned: gemini1_percent_tssc_earned ?? "0%",
        gemini21_tssc_earned: gemini21_tssc_earned ?? "0",
        gemini21_percent_of_total_token_supply_earned:
          gemini21_percent_of_total_token_supply_earned ?? "0%",
        gemini22_tssc_earned: gemini22_tssc_earned ?? "0",
        gemini22_percent_of_gemini_ii_tssc_farmer:
          gemini22_percent_of_gemini_ii_tssc_farmer ?? "0%",
        gemini22_percent_of_total_token_supply_earned:
          gemini22_percent_of_total_token_supply_earned ?? "0%",
        gemini3f_tssc_earned: "0",
      };
    }
  });

  rewards3FRows.forEach((row) => {
    const { accountId, rewards } = row;
    if (accountId && rewards) {
      rewardsMap[accountId] = {
        accountId: accountId,
        aries_blocks_won: rewardsMap[accountId]?.aries_blocks_won ?? "0",
        gemini1_tssc_earned: rewardsMap[accountId]?.gemini1_tssc_earned ?? "0",
        gemini1_percent_tssc_earned:
          rewardsMap[accountId]?.gemini1_percent_tssc_earned ?? "0%",
        gemini21_tssc_earned:
          rewardsMap[accountId]?.gemini21_tssc_earned ?? "0",
        gemini21_percent_of_total_token_supply_earned:
          rewardsMap[accountId]
            ?.gemini21_percent_of_total_token_supply_earned ?? "0%",
        gemini22_tssc_earned:
          rewardsMap[accountId]?.gemini22_tssc_earned ?? "0",
        gemini22_percent_of_gemini_ii_tssc_farmer:
          rewardsMap[accountId]?.gemini22_percent_of_gemini_ii_tssc_farmer ??
          "0%",
        gemini22_percent_of_total_token_supply_earned:
          rewardsMap[accountId]
            ?.gemini22_percent_of_total_token_supply_earned ?? "0%",
        gemini3f_tssc_earned: rewards,
      };
    }
  });

  const tsContent = `export const rewardsMap: Record<string, {
    accountId: string;
    aries_blocks_won: string;
    gemini1_tssc_earned: string;
    gemini1_percent_tssc_earned: string;
    gemini21_tssc_earned: string;
    gemini21_percent_of_total_token_supply_earned: string;
    gemini22_tssc_earned: string;
    gemini22_percent_of_gemini_ii_tssc_farmer: string;
    gemini22_percent_of_total_token_supply_earned: string;
    gemini3f_tssc_earned: string;
  }> = ${JSON.stringify(rewardsMap, null, 2)};`;

  writeFile(outputFilePath, tsContent, "utf8");

  console.log("TypeScript file has been generated successfully.");
})();
