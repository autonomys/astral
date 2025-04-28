import { parseOperator, parseWithdrawal } from "@autonomys/auto-consensus";
import {
  AnyTuple,
  ApiDecoration,
  ApiPromise,
  Codec,
  StorageKey,
  stringify,
} from "@autonomys/auto-utils";
import { api, getApiAt } from "../chain/client.ts";
import {
  SHARES_CALCULATION_MULTIPLIER,
  ZERO_BIGINT,
} from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import { Extrinsic } from "../types/chain.ts";
import {
  createDomainStakingHistory,
  createOperatorStakingHistory,
} from "../utils/cache.ts";
import { aggregateByDomainId, createHashId } from "../utils/helper.ts";

export const mappingStates = async (
  apiPatched: ApiPromise | ApiDecoration<"promise">,
  cache: Cache,
  date: Date,
  height: bigint,
  parentHash: string,
  extrinsics: Extrinsic[],
  rawOperators: any[],
  rawDomainStakingSummary: any[],
  rawOperatorIdOwner: any[]
): Promise<Cache> => {
  const operators = rawOperators.map((o) => parseOperator(o));

  rawDomainStakingSummary.forEach((data) => {
    const keyPrimitive = data[0].toPrimitive() as any;
    const valuePrimitive = data[1].toPrimitive() as any;
    const domainId = keyPrimitive[0].toString();
    const { totalStake, totalShares } = aggregateByDomainId(
      operators,
      BigInt(domainId)
    );
    const sharePrice = totalStake > 0 ? totalStake / totalShares : ZERO_BIGINT;
    const currentEpochIndex = valuePrimitive.currentEpochIndex.toString();
    cache.domainStakingHistory.push(
      createDomainStakingHistory(
        createHashId(data),
        keyPrimitive[0].toString(),
        currentEpochIndex,
        valuePrimitive.currentTotalStake.toString(),
        totalShares,
        sharePrice,
        date,
        height
      )
    );
    cache.lastDomainEpoch.set(domainId, currentEpochIndex);
  });

  if (rawOperatorIdOwner.length > 0) {
    cache.operatorOwnerMap = new Map(
      rawOperatorIdOwner.map(([key, value]) => [
        (key.toHuman() as any)[0].toString(),
        value.toPrimitive() as string,
      ])
    );
  }
  operators.forEach((operator) => {
    const operatorOwner = cache.operatorOwnerMap.get(
      operator.operatorId.toString()
    );
    const sharePrice = operator.operatorDetails.currentTotalShares
      ? BigInt(
          operator.operatorDetails.currentTotalStake *
            SHARES_CALCULATION_MULTIPLIER
        ) / BigInt(operator.operatorDetails.currentTotalShares)
      : ZERO_BIGINT;
    cache.operatorStakingHistory.push(
      createOperatorStakingHistory(
        createHashId(operator),
        operator.operatorId.toString(),
        operatorOwner ?? "",
        operator.operatorDetails.signingKey.toString(),
        operator.operatorDetails.currentDomainId.toString(),
        operator.operatorDetails.currentTotalStake,
        operator.operatorDetails.currentTotalShares,
        operator.operatorDetails.depositsInEpoch,
        operator.operatorDetails.withdrawalsInEpoch,
        operator.operatorDetails.totalStorageFeeDeposit,
        sharePrice,
        stringify(operator.operatorDetails.partialStatus),
        date,
        height
      )
    );
  });

  if (
    extrinsics.find(
      (e) => e.section === "domains" && e.method === "unlockNominator"
    )
  ) {
    const parentBlockApi = api
      ? height > 824013 && height <= 835748
        ? apiPatched
        : await getApiAt(api, parentHash)
      : api;
    const parentBlockOperators =
      await parentBlockApi.query.domains.operators.entries();
    parentBlockOperators.forEach((o: [StorageKey<AnyTuple>, Codec]) =>
      cache.parentBlockOperators.push(parseOperator(o))
    );
  }
  if (
    extrinsics.find(
      (e) => e.section === "domains" && e.method === "withdrawStake"
    )
  ) {
    const withdrawals = await apiPatched.query.domains.withdrawals.entries();
    withdrawals.forEach((o: [StorageKey<AnyTuple>, Codec]) =>
      cache.currentWithdrawal.push(parseWithdrawal(o))
    );
  }
  return cache;
};
