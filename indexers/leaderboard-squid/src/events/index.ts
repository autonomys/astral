import type { ApiPromise } from "@autonomys/auto-utils";
import type { CtxBlock, CtxEvent } from "../processor";
import { events } from "../types";
import { Cache } from "../utils/cache";
import { processRemarkEvent, processTransferEvent } from "./account";
import {
  processExtrinsicFailedEvent,
  processExtrinsicSuccessEvent,
} from "./extrinsic"; // Import the new processing functions
import {
  processFarmerBlockRewardEvent,
  processFarmerVoteRewardEvent,
} from "./farmer";
import { processTransactionFeePaidEvent } from "./fee";
import {
  processBundleStoredEvent,
  processOperatorNominatedEvent,
  processOperatorRegisteredEvent,
  processOperatorRewardedEvent,
  processOperatorTaxCollectedEvent,
  processWithdrewStakeEvent,
} from "./staking";

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  events: CtxEvent[]
) {
  for (let event of events) {
    cache = await processEvent(cache, api, block, event);
  }
  return cache;
}

async function processEvent(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  event: CtxEvent
) {
  switch (event.name) {
    // account events
    case events.balances.transfer.name:
      return processTransferEvent(cache, block, event);
    case events.system.remarked.name:
      return processRemarkEvent(cache, block, event);
    case events.system.extrinsicSuccess.name:
      return processExtrinsicSuccessEvent(cache, block, event);
    case events.system.extrinsicFailed.name:
      return processExtrinsicFailedEvent(cache, block, event);
    case events.transactionPayment.transactionFeePaid.name:
      return processTransactionFeePaidEvent(cache, block, event);
    // farmer events
    case events.rewards.voteReward.name:
      return processFarmerVoteRewardEvent(cache, block, event);
    case events.rewards.blockReward.name:
      return processFarmerBlockRewardEvent(cache, block, event);
    // operator & nominator events
    case events.domains.operatorRewarded.name:
      return processOperatorRewardedEvent(cache, block, event);
    case events.domains.operatorTaxCollected.name:
      return processOperatorTaxCollectedEvent(cache, block, event);
    case events.domains.bundleStored.name:
      return processBundleStoredEvent(cache, block, event);
    case events.domains.operatorRegistered.name:
      return processOperatorRegisteredEvent(cache, block, event);
    case events.domains.operatorNominated.name:
      return processOperatorNominatedEvent(cache, block, event);
    case events.domains.withdrewStake.name:
      return processWithdrewStakeEvent(cache, block, event);
    case events.domains.storageFeeDeposited.name:
    default:
      return cache;
  }
}
