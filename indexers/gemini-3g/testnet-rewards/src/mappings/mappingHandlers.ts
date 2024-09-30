import { SubstrateEvent } from "@subql/types";
import { Nominator, Operator, OperatorReward } from "../types";
import {
  dateEntry,
  getBlockNumberFromEvent,
  getSignedExtrinsicCallArgs,
} from "./utils";

const STAKE_WARS_START_BLOCK = 334753;
const STAKE_WARS_END_BLOCK = 1040169;

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      data: [operatorId, domainId],
    },
    extrinsic,
  } = event;
  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const { signer, args } = getSignedExtrinsicCallArgs(extrinsic);
  const totalAmount = BigInt(args.amount.toString());

  const operator = Operator.create({
    id: `${operatorId}`,
    operatorId: operatorId.toString(),
    domainId: domainId.toString(),
    accountId: signer,
    totalRewards: BigInt(0),
    totalAmount,
    ...dateEntry(blockNumber),
  });
  await operator.save();
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      method,
      data: [_operatorId, _nominatorId],
    },
    extrinsic,
  } = event;

  if (!extrinsic) {
    logger.info("No extrinsic found");
    throw new Error("No extrinsic found");
  }

  const { signer, args } = getSignedExtrinsicCallArgs(extrinsic);

  const amount = BigInt(args.amount.toString());
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();

  const operator = await Operator.get(operatorId);
  if (operator) {
    operator.totalAmount += amount;
    operator.updatedAt = blockNumber;
    await operator.save();
  }

  const nominator = await Nominator.get(`${nominatorId}-${operatorId}`);
  if (nominator) {
    nominator.amount += amount;
    nominator.updatedAt = blockNumber;
    await nominator.save();
  } else {
    const nominator = Nominator.create({
      id: `${nominatorId}-${operatorId}`,
      operatorId,
      accountId: nominatorId,
      amount,
      ...dateEntry(blockNumber),
    });
    await nominator.save();
  }
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = getBlockNumberFromEvent(event);
  const {
    event: {
      data: [_operatorId, _reward],
    },
  } = event;
  if (_reward.toString() === "0") return;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());

  if (
    blockNumber < STAKE_WARS_START_BLOCK ||
    blockNumber > STAKE_WARS_END_BLOCK
  ) {
    return;
  }

  const operator = await Operator.get(operatorId);
  if (operator) {
    operator.totalRewards += reward;
    operator.updatedAt = blockNumber;
    await operator.save();
  }
  const operatorReward = OperatorReward.create({
    id: `${operatorId}-${blockNumber}`,
    operatorId,
    amount: reward,
    ...dateEntry(blockNumber),
  });
  await operatorReward.save();
}
