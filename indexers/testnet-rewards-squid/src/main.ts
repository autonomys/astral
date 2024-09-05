import { TypeormDatabase } from "@subsquid/typeorm-store";
import {
  Account,
  AccountPerCampaign,
  Campaign,
  Domain,
  Nominator,
  Operator,
} from "./model";
import type { CtxBlock, CtxEvent } from "./processor";
import { processor } from "./processor";
import { loadStaticData } from "./static";
import { events } from "./types";
import { getBlockNumber, hexToAccount, logBlock } from "./utils";
import { Cache, load, save } from "./utils/cache";
import { calculatePercentage } from "./utils/percentage";
import { sort } from "./utils/sort";
import { calculateTotalEarnings } from "./utils/total";

const campaign6 = new Campaign({
  id: "gemini-3h",
  name: "Gemini 3H",
  totalEarningsAmountATCToken: BigInt(0),
  totalEarningsPercentageATCToken: "0",
  totalEarningsAmountTestnetToken: BigInt(0),
  totalEarningsPercentageTestnetToken: "0",
  createdAt: 0,
  updatedAt: 0,
});

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let cache: Cache = await load(ctx);
  logBlock(ctx.blocks);

  const staticDataAdded = cache.staticDataAdded.get("0");
  if (!staticDataAdded || staticDataAdded.added === false) {
    cache = await loadStaticData(cache);
  }
  cache.campaigns.set(campaign6.id, campaign6);

  for (let block of ctx.blocks) {
    for (let event of block.events) {
      switch (event.name) {
        case events.rewards.voteReward.name:
          cache = processFarmerVoteRewardEvent(cache, block, event);
          break;
        case events.rewards.blockReward.name:
          cache = processFarmerBlockRewardEvent(cache, block, event);
          break;
        case events.domains.domainInstantiated.name:
          cache = processDomainInstantiatedEvent(cache, block, event);
          break;
        case events.domains.operatorSwitchedDomain.name:
          processOperatorSwitchedDomainEvent(cache, block, event);
          break;
        case events.domains.operatorDeregistered.name:
          cache = processOperatorDeregisteredEvent(cache, block, event);
          break;
        case events.domains.withdrewStake.name:
          cache = processWithdrewStakeEvent(cache, block, event);
          break;
        case events.domains.operatorRegistered.name:
          cache = processOperatorRegisteredEvent(cache, block, event);
          break;
        case events.domains.operatorNominated.name:
          cache = processOperatorNominatedEvent(cache, block, event);
          break;
        case events.domains.operatorRewarded.name:
          cache = processOperatorRewardedEvent(cache, block, event);
          break;
        case events.domains.operatorSlashed.name:
          cache = processOperatorSlashedEvent(cache, block, event);
          break;
        default:
          break;
      }
    }
  }

  const lastBlock = ctx.blocks[ctx.blocks.length - 1];
  const cacheWithTotalEarnings = calculateTotalEarnings(cache, lastBlock);
  const cacheWithPercentage = calculatePercentage(cacheWithTotalEarnings);

  await save(ctx, sort(cacheWithPercentage));
});

export function processFarmerVoteRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.voter);
  const reward = BigInt(event.args.reward);

  const blockNumber = getBlockNumber(block);

  // Create or update Account entity
  let accountPerCampaign6 = cache.accountPerCampaigns.get(
    accountId + "-" + campaign6.id
  );
  if (!accountPerCampaign6) {
    accountPerCampaign6 = new AccountPerCampaign({
      id: accountId + "-" + campaign6.id,
      accountId: accountId,
      campaignId: campaign6.id,
      totalEarningsAmountTestnetToken: reward,
      totalEarningsPercentageTestnetToken: "",
      totalEarningsAmountATCToken: BigInt(0),
      totalEarningsPercentageATCToken: "",
      rank: BigInt(0),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    accountPerCampaign6.totalEarningsAmountTestnetToken += reward;
    accountPerCampaign6.updatedAt = blockNumber;
  }
  cache.accountPerCampaigns.set(accountPerCampaign6.id, accountPerCampaign6);

  campaign6.totalEarningsAmountTestnetToken += reward;
  campaign6.updatedAt = blockNumber;
  cache.campaigns.set(campaign6.id, campaign6);

  // Create or update Account entity
  let account5 = cache.accounts.get(accountId);
  if (!account5) {
    account5 = new Account({
      id: accountId,
      totalCampaignsParticipated: BigInt(1),
      totalEarningsAmountTestnetToken: reward,
      totalEarningsPercentageTestnetToken: "",
      totalEarningsAmountATCToken: BigInt(0),
      totalEarningsPercentageATCToken: "",
      rank: BigInt(0),
      createdAt: 0,
      updatedAt: 0,
    });
  } else {
    account5.totalCampaignsParticipated += BigInt(1);
    account5.totalEarningsAmountTestnetToken += reward;
  }
  cache.accounts.set(account5.id, account5);

  return cache;
}

export function processFarmerBlockRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.blockAuthor);
  const reward = BigInt(event.args.reward);

  const blockNumber = getBlockNumber(block);

  // Create or update Account entity
  let accountPerCampaign6 = cache.accountPerCampaigns.get(
    accountId + "-" + campaign6.id
  );
  if (!accountPerCampaign6) {
    accountPerCampaign6 = new AccountPerCampaign({
      id: accountId + "-" + campaign6.id,
      accountId: accountId,
      campaignId: campaign6.id,
      totalEarningsAmountTestnetToken: reward,
      totalEarningsPercentageTestnetToken: "",
      totalEarningsAmountATCToken: BigInt(0),
      totalEarningsPercentageATCToken: "",
      rank: BigInt(0),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    accountPerCampaign6.totalEarningsAmountTestnetToken += reward;
    accountPerCampaign6.updatedAt = blockNumber;
  }
  cache.accountPerCampaigns.set(accountPerCampaign6.id, accountPerCampaign6);

  campaign6.totalEarningsAmountTestnetToken += reward;
  campaign6.updatedAt = blockNumber;
  cache.campaigns.set(campaign6.id, campaign6);

  // Create or update Account entity
  let account5 = cache.accounts.get(accountId);
  if (!account5) {
    account5 = new Account({
      id: accountId,
      totalCampaignsParticipated: BigInt(1),
      totalEarningsAmountTestnetToken: reward,
      totalEarningsPercentageTestnetToken: "",
      totalEarningsAmountATCToken: BigInt(0),
      totalEarningsPercentageATCToken: "",
      rank: BigInt(0),
      createdAt: 0,
      updatedAt: 0,
    });
  } else {
    account5.totalCampaignsParticipated += BigInt(1);
    account5.totalEarningsAmountTestnetToken += reward;
  }
  cache.accounts.set(account5.id, account5);

  return cache;
}

export function processOperatorRewardedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";
  const reward = BigInt(event.args.reward);

  return cache;
}

export function processDomainInstantiatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const domainId = String(event.args.domainId);
  const updatedAt = getBlockNumber(block);

  // Create or update the Domain entity
  let domain = cache.domains.get(domainId);
  if (!domain) {
    domain = new Domain({
      id: domainId,
      createdAt: updatedAt,
      updatedAt,
    });
  } else {
    domain.updatedAt = updatedAt;
  }

  cache.domains.set(domain.id, domain);
  cache.isModified = true;

  return cache;
}

export function processOperatorSwitchedDomainEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  throw new Error("operatorSwitchedDomainEvent should never be emitted");
}

export function processOperatorDeregisteredEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId);
  // Process operator deregistration logic here
  return cache;
}

export function processWithdrewStakeEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.account);
  const amount = BigInt(event.args.amount);
  // Process stake withdrawal logic here
  return cache;
}

export function processOperatorRegisteredEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId);
  const domainId = String(event.args.domainId);
  const updatedAt = getBlockNumber(block);

  let operator = cache.operators.get(operatorId);
  if (!operator) {
    operator = new Operator({
      id: operatorId,
      domainId,
      currentTotalShares: BigInt(0),
      currentTotalStake: BigInt(0),
      createdAt: updatedAt,
      updatedAt,
    });
  } else {
    operator.updatedAt = updatedAt;
  }

  cache.operators.set(operator.id, operator);
  cache.isModified = true;

  return cache;
}

export function processOperatorNominatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId);
  const nominatorId = hexToAccount(event.args.nominator);
  const amount = BigInt(event.args.amount);
  const updatedAt = getBlockNumber(block);

  // Get the operator to retrieve the domainId
  const operator = cache.operators.get(operatorId);
  if (!operator) {
    console.warn(`Operator ${operatorId} not found for nomination event`);
    return cache;
  }

  // Create or update the Nominator entity
  const nominatorKey = `${nominatorId}-${operatorId}`;
  let nominator = cache.nominators.get(nominatorKey);
  if (!nominator) {
    nominator = new Nominator({
      id: nominatorKey,
      accountId: nominatorId,
      domainId: operator.domainId,
      operatorId: operatorId,
      currentTotalShares: BigInt(0),
      currentTotalStake: BigInt(0),
      createdAt: updatedAt,
      updatedAt: updatedAt,
    });
  }

  // Update the nominator's stake and shares
  nominator.currentTotalStake += amount;
  // Note: You may need to calculate shares based on your specific logic
  // For this example, we're assuming 1:1 ratio between stake and shares
  nominator.currentTotalShares += amount;
  nominator.updatedAt = updatedAt;

  // Update the operator's total stake
  operator.currentTotalStake += amount;
  operator.updatedAt = updatedAt;

  // Save the updated entities to the cache
  cache.nominators.set(nominatorKey, nominator);
  cache.operators.set(operatorId, operator);
  cache.isModified = true;

  return cache;
}

export function processOperatorSlashedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId);
  const amount = BigInt(event.args.amount);
  // Process operator slashing logic here
  return cache;
}
