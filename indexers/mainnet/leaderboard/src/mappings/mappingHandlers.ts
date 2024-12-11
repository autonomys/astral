import { SubstrateEvent } from "@subql/types";
import * as db from "./db";

const getEventInfo = (event: SubstrateEvent) => {
  const { extrinsic } = event;
  const blockHeight = BigInt(event.block.block.header.number.toString());
  const timestamp = event.block.timestamp ?? new Date(0);
  const extrinsicId = `${blockHeight}-${extrinsic ? extrinsic.idx : "system"}`;
  const eventId = `${blockHeight}-${event.event.index}`;
  return { blockHeight, timestamp, extrinsicId, eventId };
};

export async function handleTransferEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_from, _to, _amount],
    },
  } = event;
  const from = _from.toString();
  const to = _to.toString();
  const amount = BigInt(_amount.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveAccountTransferSenderTotalCount(
    from,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveAccountTransferSenderTotalValue(
    from,
    amount,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );

  await db.createAndSaveAccountTransferReceiverTotalCount(
    to,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveAccountTransferReceiverTotalValue(
    to,
    amount,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleRemarkEvent(event: SubstrateEvent): Promise<void> {
  const {
    extrinsic,
    event: { index },
  } = event;
  if (!extrinsic) return;

  const accountId = extrinsic.extrinsic.signer.toString();
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveAccountRemarkCount(
    accountId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleExtrinsicSuccessEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { index },
  } = event;
  if (!extrinsic) return;

  const accountId = extrinsic.extrinsic.signer.toString();
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveAccountExtrinsicTotalCount(
    accountId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveAccountExtrinsicSuccessTotalCount(
    accountId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleExtrinsicFailedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { index },
  } = event;
  if (!extrinsic) return;

  const accountId = extrinsic.extrinsic.signer.toString();
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveAccountExtrinsicTotalCount(
    accountId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveAccountExtrinsicFailedTotalCount(
    accountId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleTransactionFeePaidEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_who, _actualFee, _tip],
    },
  } = event;
  const who = _who.toString();
  const actualFee = BigInt(_actualFee.toString());
  const tip = BigInt(_tip.toString());
  const totalFeePaid = actualFee + tip;
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveAccountTransactionFeePaidTotalValue(
    who,
    totalFeePaid,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleFarmerVoteRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_voter, _reward],
    },
  } = event;
  if (!extrinsic) return;

  const voter = _voter.toString();
  const reward = BigInt(_reward.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveFarmerVoteTotalCount(
    voter,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveFarmerVoteTotalValue(
    voter,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );

  await db.createAndSaveFarmerVoteAndBlockTotalCount(
    voter,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveFarmerVoteAndBlockTotalValue(
    voter,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleFarmerBlockRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_blockAuthor, _reward],
    },
  } = event;
  const blockAuthor = _blockAuthor.toString();
  const reward = BigInt(_reward.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveFarmerBlockTotalCount(
    blockAuthor,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveFarmerBlockTotalValue(
    blockAuthor,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );

  await db.createAndSaveFarmerVoteAndBlockTotalCount(
    blockAuthor,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveFarmerVoteAndBlockTotalValue(
    blockAuthor,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_operatorId, _reward],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  if (reward === BigInt(0)) return;

  await db.createAndSaveOperatorTotalRewardsCollected(
    operatorId,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleOperatorTaxCollectedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_operatorId, _tax],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const tax = BigInt(_tax.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveOperatorTotalTaxCollected(
    operatorId,
    tax,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleBundleStoredEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_bundleAuthor],
    },
  } = event;
  const operatorId = _bundleAuthor.toString();
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveOperatorBundleTotalCount(
    operatorId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_operatorId, _reward],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveOperatorTotalRewardsCollected(
    operatorId,
    reward,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_operatorId, _nominatorId, _amount],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const amount = BigInt(_amount.toString());
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveOperatorDepositsTotalCount(
    operatorId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveOperatorDepositsTotalValue(
    operatorId,
    amount,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );

  await db.createAndSaveNominatorDepositsTotalCount(
    nominatorId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveNominatorDepositsTotalValue(
    nominatorId,
    amount,
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}

export async function handleWithdrewStakeEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      index,
      data: [_operatorId, _nominatorId],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const { blockHeight, timestamp, extrinsicId, eventId } = getEventInfo(event);

  await db.createAndSaveOperatorWithdrawalsTotalCount(
    operatorId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
  await db.createAndSaveNominatorWithdrawalsTotalCount(
    nominatorId,
    BigInt(1),
    blockHeight,
    timestamp,
    extrinsicId,
    eventId
  );
}
