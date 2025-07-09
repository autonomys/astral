import { EventRecord } from '@autonomys/auto-utils';
import * as db from './db';
import { Cache } from './db';
import { ExtrinsicPrimitive } from './types';
type EventHandler = (params: {
  event: EventRecord;
  cache: Cache;
  height: bigint;
  timestamp: Date;
  extrinsicId: string;
  eventId: string;
  extrinsicSigner: string;
  extrinsicMethodToPrimitive?: ExtrinsicPrimitive;
}) => void;

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  'balances.Transfer': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const from = event.event.data[0].toString();
    const to = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());

    cache.accountTransferSenderTotalCountHistory.push(
      db.createAccountTransferSenderTotalCount(
        from,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.accountTransferSenderTotalValueHistory.push(
      db.createAccountTransferSenderTotalValue(
        from,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );

    cache.accountTransferReceiverTotalCountHistory.push(
      db.createAccountTransferReceiverTotalCount(
        to,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.accountTransferReceiverTotalValueHistory.push(
      db.createAccountTransferReceiverTotalValue(
        to,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'transactionPayment.TransactionFeePaid': ({
    event,
    cache,
    height,
    timestamp,
    extrinsicId,
    eventId,
  }) => {
    const who = event.event.data[0].toString();
    const actualFee = BigInt(event.event.data[1].toString());
    const tip = BigInt(event.event.data[2].toString());

    cache.accountTransactionFeePaidTotalValueHistory.push(
      db.createAccountTransactionFeePaidTotalValue(
        who,
        actualFee + tip,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'domains.OperatorRewarded': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const operatorId = event.event.data[1].toString();
    const reward = BigInt(event.event.data[1].toString());
    if (reward === BigInt(0)) return;

    cache.operatorTotalRewardsCollectedHistory.push(
      db.createOperatorTotalRewardsCollected(
        operatorId,
        reward,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'domains.OperatorTaxCollected': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const operatorId = event.event.data[0].toString();
    const tax = BigInt(event.event.data[1].toString());

    cache.operatorTotalTaxCollectedHistory.push(
      db.createOperatorTotalTaxCollected(operatorId, tax, height, extrinsicId, eventId, timestamp),
    );
  },
  'domains.BundleStored': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const bundleAuthor = event.event.data[0].toString();

    cache.operatorBundleTotalCountHistory.push(
      db.createOperatorBundleTotalCount(
        bundleAuthor,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'domains.OperatorRegistered': ({
    event,
    cache,
    height,
    timestamp,
    extrinsicId,
    eventId,
    extrinsicSigner,
    extrinsicMethodToPrimitive,
  }) => {
    const operatorId = event.event.data[1].toString();
    const amount = extrinsicMethodToPrimitive
      ? BigInt(String(extrinsicMethodToPrimitive.args.amount))
      : BigInt(0);

    cache.operatorDepositsTotalCountHistory.push(
      db.createOperatorDepositsTotalCount(
        operatorId,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.operatorDepositsTotalValueHistory.push(
      db.createOperatorDepositsTotalValue(
        operatorId,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );

    cache.nominatorDepositsTotalCountHistory.push(
      db.createNominatorDepositsTotalCount(
        extrinsicSigner,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.nominatorDepositsTotalValueHistory.push(
      db.createNominatorDepositsTotalValue(
        extrinsicSigner,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'domains.OperatorNominated': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const operatorId = event.event.data[0].toString();
    const nominatorId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());

    cache.operatorDepositsTotalCountHistory.push(
      db.createOperatorDepositsTotalCount(
        operatorId,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.operatorDepositsTotalValueHistory.push(
      db.createOperatorDepositsTotalValue(
        operatorId,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );

    cache.nominatorDepositsTotalCountHistory.push(
      db.createNominatorDepositsTotalCount(
        nominatorId,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.nominatorDepositsTotalValueHistory.push(
      db.createNominatorDepositsTotalValue(
        nominatorId,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  'domains.NominatedStakedUnlocked': ({
    event,
    cache,
    height,
    timestamp,
    extrinsicId,
    eventId,
  }) => {
    const operatorId = event.event.data[0].toString();
    const nominatorId = event.event.data[1].toString();
    const amount = BigInt(event.event.data[2].toString());

    cache.operatorWithdrawalsTotalCountHistory.push(
      db.createOperatorWithdrawalsTotalCount(
        operatorId,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.operatorWithdrawalsTotalValueHistory.push(
      db.createOperatorWithdrawalsTotalValue(
        operatorId,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );

    cache.nominatorWithdrawalsTotalCountHistory.push(
      db.createNominatorWithdrawalsTotalCount(
        nominatorId,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.nominatorWithdrawalsTotalValueHistory.push(
      db.createNominatorWithdrawalsTotalValue(
        nominatorId,
        amount,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
  // Finalization events
  'rewards.VoteReward': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const voter = event.event.data[0].toString();
    const reward = BigInt(event.event.data[1].toString());

    cache.farmerVoteTotalCountHistory.push(
      db.createFarmerVoteTotalCount(voter, BigInt(1), height, extrinsicId, eventId, timestamp),
    );
    cache.farmerVoteTotalValueHistory.push(
      db.createFarmerVoteTotalValue(voter, reward, height, extrinsicId, eventId, timestamp),
    );

    cache.farmerVoteAndBlockTotalCountHistory.push(
      db.createFarmerVoteAndBlockTotalCount(
        voter,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.farmerVoteAndBlockTotalValueHistory.push(
      db.createFarmerVoteAndBlockTotalValue(voter, reward, height, extrinsicId, eventId, timestamp),
    );
  },
  'rewards.BlockReward': ({ event, cache, height, timestamp, extrinsicId, eventId }) => {
    const blockAuthor = event.event.data[0].toString();
    const reward = BigInt(event.event.data[1].toString());

    cache.farmerBlockTotalCountHistory.push(
      db.createFarmerBlockTotalCount(
        blockAuthor,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.farmerBlockTotalValueHistory.push(
      db.createFarmerBlockTotalValue(blockAuthor, reward, height, extrinsicId, eventId, timestamp),
    );

    cache.farmerVoteAndBlockTotalCountHistory.push(
      db.createFarmerVoteAndBlockTotalCount(
        blockAuthor,
        BigInt(1),
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
    cache.farmerVoteAndBlockTotalValueHistory.push(
      db.createFarmerVoteAndBlockTotalValue(
        blockAuthor,
        reward,
        height,
        extrinsicId,
        eventId,
        timestamp,
      ),
    );
  },
};
