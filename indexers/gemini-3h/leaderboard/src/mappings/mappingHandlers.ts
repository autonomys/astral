import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { LEADERBOARD_ENTRY_TYPE } from "./contants";
import { createAndSaveLeaderboardEntry } from "./db";
import { sortAndRankLeaderboard } from "./helper";

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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_TRANSFER_SENDER_TOTAL_COUNT,
    from,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_TRANSFER_SENDER_TOTAL_VALUE,
    from,
    amount,
    timestamp,
    blockNumber
  );

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_TRANSFER_RECEIVER_TOTAL_COUNT,
    to,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_TRANSFER_RECEIVER_TOTAL_VALUE,
    to,
    amount,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_REMARK_COUNT,
    accountId,
    1,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_EXTRINSIC_TOTAL_COUNT,
    accountId,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_EXTRINSIC_SUCCESS_TOTAL_COUNT,
    accountId,
    1,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_EXTRINSIC_TOTAL_COUNT,
    accountId,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_EXTRINSIC_FAILED_TOTAL_COUNT,
    accountId,
    1,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.ACCOUNT_TRANSACTION_FEE_PAID_TOTAL_VALUE,
    who,
    totalFeePaid,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_TOTAL_COUNT,
    voter,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_TOTAL_VALUE,
    voter,
    reward,
    timestamp,
    blockNumber
  );

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_AND_BLOCK_TOTAL_COUNT,
    voter,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_AND_BLOCK_TOTAL_VALUE,
    voter,
    reward,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_BLOCK_TOTAL_COUNT,
    blockAuthor,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_BLOCK_TOTAL_VALUE,
    blockAuthor,
    reward,
    timestamp,
    blockNumber
  );

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_AND_BLOCK_TOTAL_COUNT,
    blockAuthor,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.FARMER_VOTE_AND_BLOCK_TOTAL_VALUE,
    blockAuthor,
    reward,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_TOTAL_REWARDS_COLLECTED,
    operatorId,
    reward,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_TOTAL_TAX_COLLECTED,
    operatorId,
    tax,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_BUNDLE_TOTAL_COUNT,
    operatorId,
    1,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_TOTAL_REWARDS_COLLECTED,
    operatorId,
    reward,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_DEPOSITS_TOTAL_COUNT,
    operatorId,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_DEPOSITS_TOTAL_VALUE,
    operatorId,
    amount,
    timestamp,
    blockNumber
  );

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.NOMINATOR_DEPOSITS_TOTAL_COUNT,
    nominatorId,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.NOMINATOR_DEPOSITS_TOTAL_VALUE,
    nominatorId,
    amount,
    timestamp,
    blockNumber
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

  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.OPERATOR_WITHDRAWALS_TOTAL_COUNT,
    operatorId,
    1,
    timestamp,
    blockNumber
  );
  await createAndSaveLeaderboardEntry(
    LEADERBOARD_ENTRY_TYPE.NOMINATOR_WITHDRAWALS_TOTAL_COUNT,
    nominatorId,
    1,
    timestamp,
    blockNumber
  );
}

export async function handleSortAndRankLeaderboard(
  block: SubstrateBlock
): Promise<void> {
  const {
    block: {
      header: { number },
    },
  } = block;
  await sortAndRankLeaderboard(BigInt(number.toString()));
}
