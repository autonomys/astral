import { SubstrateEvent } from "@subql/types";
import * as db from "./db";

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
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetAccountTransferSenderTotalCount(
    from,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetAccountTransferSenderTotalValue(
    from,
    amount,
    blockNumber,
    timestamp
  );

  await db.checkAndGetAccountTransferReceiverTotalCount(
    to,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetAccountTransferReceiverTotalValue(
    to,
    amount,
    blockNumber,
    timestamp
  );
}

export async function handleRemarkEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: { index },
  } = event;

  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetAccountRemarkCount(
    accountId,
    BigInt(1),
    blockNumber,
    timestamp
  );
}

export async function handleExtrinsicSuccessEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: { index },
  } = event;

  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetAccountExtrinsicTotalCount(
    accountId,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetAccountExtrinsicSuccessTotalCount(
    accountId,
    BigInt(1),
    blockNumber,
    timestamp
  );
}

export async function handleExtrinsicFailedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: { index },
  } = event;
  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetAccountExtrinsicTotalCount(
    accountId,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetAccountExtrinsicFailedTotalCount(
    accountId,
    BigInt(1),
    blockNumber,
    timestamp
  );
}

export async function handleTransactionFeePaidEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_who, _actualFee, _tip],
    },
  } = event;
  const who = _who.toString();
  const actualFee = BigInt(_actualFee.toString());
  const tip = BigInt(_tip.toString());
  const totalFeePaid = actualFee + tip;
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetAccountTransactionFeePaidTotalValue(
    who,
    totalFeePaid,
    blockNumber,
    timestamp
  );
}

export async function handleFarmerVoteRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_voter, _reward],
    },
  } = event;
  const voter = _voter.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetFarmerVoteTotalCount(
    voter,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetFarmerVoteTotalValue(
    voter,
    reward,
    blockNumber,
    timestamp
  );

  await db.checkAndGetFarmerVoteAndBlockTotalCount(
    voter,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetFarmerVoteAndBlockTotalValue(
    voter,
    reward,
    blockNumber,
    timestamp
  );
}

export async function handleFarmerBlockRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_blockAuthor, _reward],
    },
  } = event;
  const blockAuthor = _blockAuthor.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetFarmerBlockTotalCount(
    blockAuthor,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetFarmerBlockTotalValue(
    blockAuthor,
    reward,
    blockNumber,
    timestamp
  );

  await db.checkAndGetFarmerVoteAndBlockTotalCount(
    blockAuthor,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetFarmerVoteAndBlockTotalValue(
    blockAuthor,
    reward,
    blockNumber,
    timestamp
  );
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_operatorId, _reward],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  if (reward === BigInt(0)) return;

  await db.checkAndGetOperatorTotalRewardsCollected(
    operatorId,
    reward,
    blockNumber,
    timestamp
  );
}

export async function handleOperatorTaxCollectedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_operatorId, _tax],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const tax = BigInt(_tax.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetOperatorTotalTaxCollected(
    operatorId,
    tax,
    blockNumber,
    timestamp
  );
}

export async function handleBundleStoredEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_bundleAuthor],
    },
  } = event;
  const operatorId = _bundleAuthor.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetOperatorBundleTotalCount(
    operatorId,
    BigInt(1),
    blockNumber,
    timestamp
  );
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_operatorId, _reward],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetOperatorTotalRewardsCollected(
    operatorId,
    reward,
    blockNumber,
    timestamp
  );
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_operatorId, _nominatorId, _amount],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const amount = BigInt(_amount.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetOperatorDepositsTotalCount(
    operatorId,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetOperatorDepositsTotalValue(
    operatorId,
    amount,
    blockNumber,
    timestamp
  );

  await db.checkAndGetNominatorDepositsTotalCount(
    nominatorId,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetNominatorDepositsTotalValue(
    nominatorId,
    amount,
    blockNumber,
    timestamp
  );
}

export async function handleWithdrewStakeEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [_operatorId, _nominatorId],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = event.block.timestamp ?? new Date(0);

  await db.checkAndGetOperatorWithdrawalsTotalCount(
    operatorId,
    BigInt(1),
    blockNumber,
    timestamp
  );
  await db.checkAndGetNominatorWithdrawalsTotalCount(
    nominatorId,
    BigInt(1),
    blockNumber,
    timestamp
  );
}
