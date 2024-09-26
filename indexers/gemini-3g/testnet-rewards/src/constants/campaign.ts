export enum CampaignIds {
  Aries = "aries",
  Gemini1 = "gemini-1",
  Gemini21 = "gemini-2.1",
  Gemini22 = "gemini-2.2",
  Gemini3f = "gemini-3f",
  Gemini3g = "gemini-3g",
  Gemini3h = "gemini-3h",
  StakeWar1 = "stake-war-1",
  StakeWar2 = "stake-war-2",
}

export const baseEntry = {
  createdAt: 0,
  updatedAt: 0,
};

export const defaultCampaign = {
  totalEarningsAmountATCToken: BigInt(0),
  totalEarningsPercentageATCToken: BigInt(0),
  totalEarningsAmountTestnetToken: BigInt(0),
  totalEarningsPercentageTestnetToken: BigInt(0),
  ...baseEntry,
};

export const defaultAccount = {
  totalCampaignsParticipated: BigInt(0),
  totalEarningsAmountTestnetToken: BigInt(0),
  totalEarningsPercentageTestnetToken: BigInt(0),
  totalEarningsAmountATCToken: BigInt(0),
  totalEarningsPercentageATCToken: BigInt(0),
  rank: BigInt(0),
  ...baseEntry,
};

export const defaultAccountPerCampaign = {
  totalEarningsAmountTestnetToken: BigInt(0),
  totalEarningsPercentageTestnetToken: BigInt(0),
  totalEarningsAmountATCToken: BigInt(0),
  totalEarningsPercentageATCToken: BigInt(0),
  rank: BigInt(0),
  ...baseEntry,
};

export const campaigns = [
  {
    id: CampaignIds.Aries,
    name: "Aries",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini1,
    name: "Gemini 1",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini21,
    name: "Gemini 2.1",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini22,
    name: "Gemini 2.2",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini3f,
    name: "Gemini 3F",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini3g,
    name: "Gemini 3G",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.Gemini3h,
    name: "Gemini 3H",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.StakeWar1,
    name: "Stake War 1",
    ...defaultCampaign,
  },
  {
    id: CampaignIds.StakeWar2,
    name: "Stake War 2",
    ...defaultCampaign,
  },
];
