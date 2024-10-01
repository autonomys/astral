import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { Nominator, NominatorReward, Operator, OperatorReward } from "../types";
import { STAKE_WARS_END_BLOCK, STAKE_WARS_START_BLOCK } from "./constants";
import { dateEntry, getBlockNumberFromEvent } from "./utils";

export type OperatorDetails = {
  signingKey: string;
  currentDomainId: string;
  nextDomainId: string;
  minimumNominatorStake: string;
  nominationTax: string;
  currentTotalStake: string;
  currentEpochRewards: string;
  totalShares: string;
  status: string;
};

const update = async (number: number) => {
  const _operatorToSave: Operator[] = [];
  const _nominatorToSave: Nominator[] = [];

  const [operatorState, operatorIdOwnerStates] = await Promise.all([
    api.query.domains.operators.entries(),
    api.query.domains.operatorIdOwner.entries(),
  ]);

  const _operatorIdOwnerStates = operatorIdOwnerStates.map(([key, value]) => {
    const _key = key.toHuman() as [string];
    const _value = value.toPrimitive() as string;
    return {
      operatorId: _key[0],
      owner: _value,
    };
  });

  const _operatorState = operatorState.map(([key, value]) => {
    const _key = key.toHuman() as [string, string];
    const _value = value.toPrimitive() as OperatorDetails;
    const owner = _operatorIdOwnerStates.find(
      (o) => o.operatorId === _key[0]
    )?.owner;
    if (!owner) {
      logger.error(`Owner not found for operator ${_key[0]}`);
      throw new Error(`Owner not found for operator ${_key[0]}`);
    }
    return {
      operatorId: _key[0],
      operatorState: _value,
      owner,
    };
  });

  const nominatorsStates = await Promise.all(
    _operatorState.map(({ operatorId }) =>
      api.query.domains.nominators.entries(operatorId)
    )
  );

  const _nominatorsState = nominatorsStates
    .map((nominatorsState) =>
      nominatorsState.map(([key, value]) => {
        const _key = key.toHuman() as [string, string];
        const _value = value.toPrimitive() as { shares: string };
        return {
          operatorId: _key[0],
          nominatorId: _key[1],
          shares: BigInt(_value.shares),
        };
      })
    )
    .flat();

  for (const operatorState of _operatorState) {
    const operator = await Operator.get(operatorState.operatorId);
    if (operator) {
      operator.totalShares = BigInt(operatorState.operatorState.totalShares);
      await operator.save();
    } else {
      const operator = Operator.create({
        id: operatorState.operatorId,
        operatorId: operatorState.operatorId,
        domainId: operatorState.operatorState.currentDomainId,
        accountId: operatorState.owner,
        totalRewards: BigInt(0),
        totalAmount: BigInt(operatorState.operatorState.currentTotalStake),
        totalShares: BigInt(operatorState.operatorState.totalShares),
        ...dateEntry(number),
      });
      _operatorToSave.push(operator);
    }
  }

  for (const nominatorState of _nominatorsState) {
    const nominator = await Nominator.get(
      `${nominatorState.nominatorId}-${nominatorState.operatorId}`
    );
    if (nominator) {
      nominator.shares = nominatorState.shares;
      _nominatorToSave.push(nominator);
    } else {
      const nominator = Nominator.create({
        id: `${nominatorState.nominatorId}-${nominatorState.operatorId}`,
        operatorId: nominatorState.operatorId,
        accountId: nominatorState.nominatorId,
        amount: BigInt(0),
        totalReward: BigInt(0),
        shares: nominatorState.shares,
        ...dateEntry(number),
      });
      _nominatorToSave.push(nominator);
    }
  }

  await Promise.all([
    ..._operatorToSave.map((operator) => operator.save()),
    ..._nominatorToSave.map((nominator) => nominator.save()),
  ]);
};

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number },
    },
  } = block;
  await update(number.toNumber());
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  await update(getBlockNumberFromEvent(event));
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  await update(getBlockNumberFromEvent(event));
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const _nominatorToSave: Nominator[] = [];
  const _nominatorRewardsToSave: NominatorReward[] = [];

  const blockNumber = getBlockNumberFromEvent(event);
  const {
    idx,
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

  let operator = await Operator.get(operatorId);
  if (!operator) {
    logger.info(`Operator ${operatorId} not found, updating...`);
    await update(blockNumber);
    operator = await Operator.get(operatorId);
  }
  if (operator) {
    if (operator.totalRewards === BigInt(0)) {
      const operatorState = await api.query.domains.operators(operatorId);
      const _operatorState = operatorState.toPrimitive() as OperatorDetails;
      operator.totalShares = BigInt(_operatorState.totalShares);
    }

    operator.totalRewards += reward;
    operator.updatedAt = blockNumber;
    await operator.save();
  } else return;
  const operatorReward = OperatorReward.create({
    id: `${operatorId}-${blockNumber}-${idx}`,
    operatorId,
    amount: reward,
    ...dateEntry(blockNumber),
  });

  await operatorReward.save();

  const nominators = await Nominator.getByOperatorId(operatorId);

  if (nominators) {
    for (const nominator of nominators) {
      const nominatorReward = NominatorReward.create({
        id: `${operatorId}-${nominator.accountId}-${blockNumber}-${idx}`,
        operatorId,
        nominatorId: nominator.accountId,
        operatorShares: operator.totalShares,
        nominatorShares: nominator.shares,
        operatorTotalReward: reward,
        nominatorTotalReward:
          operator.totalShares > BigInt(0)
            ? (reward * nominator.shares) / operator.totalShares
            : BigInt(0),
        ...dateEntry(blockNumber),
      });
      _nominatorRewardsToSave.push(nominatorReward);
      nominator.totalReward += nominatorReward.nominatorTotalReward;
      nominator.updatedAt = blockNumber;
      _nominatorToSave.push(nominator);
    }
  }

  await Promise.all([
    ..._nominatorRewardsToSave.map((nominatorReward) => nominatorReward.save()),
    ..._nominatorToSave.map((nominator) => nominator.save()),
  ]);
}
