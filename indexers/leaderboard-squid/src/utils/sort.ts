import {
  FarmerBlockTotalCount,
  FarmerBlockTotalValue,
  FarmerVoteAndBlockTotalCount,
  FarmerVoteAndBlockTotalValue,
  FarmerVoteTotalCount,
  FarmerVoteTotalValue,
  NominatorDepositsTotalCount,
  NominatorDepositsTotalValue,
  NominatorWithdrawalsTotalCount,
  OperatorBundleTotalCount,
  OperatorDepositsTotalCount,
  OperatorDepositsTotalValue,
  OperatorTotalRewardsCollected,
  OperatorTotalTaxCollected,
  OperatorWithdrawalsTotalCount,
} from "../model";
import { Cache } from "./cache";

const sortId = (key: number) => key + 1;
const id = (key: number) => sortId(key).toString();

export const sort = (cache: Cache): Cache => {
  const sortedFarmerVoteTotalCount: FarmerVoteTotalCount[] = Array.from(
    cache.farmerVoteTotalCount.values()
  )
    .sort((a, b) => b.totalVoteCount - a.totalVoteCount)
    .map(
      (n, key) =>
        new FarmerVoteTotalCount({
          ...n,
          id: id(key),
          sortId: sortId(key),
        })
    );

  const sortedFarmerVoteTotalValue: FarmerVoteTotalValue[] = Array.from(
    cache.farmerVoteTotalValue.values()
  )
    .sort((a, b) =>
      a.totalVoteValue < b.totalVoteValue
        ? -1
        : a.totalVoteValue > b.totalVoteValue
        ? 1
        : 0
    )
    .map(
      (n, key) =>
        new FarmerVoteTotalValue({
          ...n,
          id: id(key),
          sortId: sortId(key),
        })
    );

  const sortedFarmerBlockTotalCount: FarmerBlockTotalCount[] = Array.from(
    cache.farmerBlockTotalCount.values()
  )
    .sort((a, b) => b.totalBlockCount - a.totalBlockCount)
    .map(
      (n, key) =>
        new FarmerBlockTotalCount({
          ...n,
          id: id(key),
          sortId: sortId(key),
        })
    );

  const sortedFarmerBlockTotalValue: FarmerBlockTotalValue[] = Array.from(
    cache.farmerBlockTotalValue.values()
  )
    .sort((a, b) =>
      a.totalBlockValue < b.totalBlockValue
        ? -1
        : a.totalBlockValue > b.totalBlockValue
        ? 1
        : 0
    )
    .map(
      (n, key) =>
        new FarmerBlockTotalValue({
          ...n,
          id: id(key),
          sortId: sortId(key),
        })
    );

  const sortedFarmerVoteAndBlockTotalCount: FarmerVoteAndBlockTotalCount[] =
    Array.from(cache.farmerVoteAndBlockTotalCount.values())
      .sort((a, b) => b.totalVoteAndBlockCount - a.totalVoteAndBlockCount)
      .map(
        (n, key) =>
          new FarmerVoteAndBlockTotalCount({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedFarmerVoteAndBlockTotalValue: FarmerVoteAndBlockTotalValue[] =
    Array.from(cache.farmerVoteAndBlockTotalValue.values())
      .sort((a, b) =>
        a.totalVoteAndBlockValue < b.totalVoteAndBlockValue
          ? -1
          : a.totalVoteAndBlockValue > b.totalVoteAndBlockValue
          ? 1
          : 0
      )
      .map(
        (n, key) =>
          new FarmerVoteAndBlockTotalValue({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedOperatorTotalRewardsCollected: OperatorTotalRewardsCollected[] =
    Array.from(cache.operatorTotalRewardsCollected.values())
      .sort((a, b) =>
        a.totalRewardsCollected < b.totalRewardsCollected
          ? -1
          : a.totalRewardsCollected > b.totalRewardsCollected
          ? 1
          : 0
      )
      .map(
        (n, key) =>
          new OperatorTotalRewardsCollected({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedOperatorTotalTaxCollected: OperatorTotalTaxCollected[] =
    Array.from(cache.operatorTotalTaxCollected.values())
      .sort((a, b) =>
        a.totalTaxCollected < b.totalTaxCollected
          ? -1
          : a.totalTaxCollected > b.totalTaxCollected
          ? 1
          : 0
      )
      .map(
        (n, key) =>
          new OperatorTotalTaxCollected({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedOperatorBundleTotalCount: OperatorBundleTotalCount[] = Array.from(
    cache.operatorBundleTotalCount.values()
  )
    .sort((a, b) => b.totalBundleCount - a.totalBundleCount)
    .map(
      (n, key) =>
        new OperatorBundleTotalCount({
          ...n,
          id: id(key),
          sortId: sortId(key),
        })
    );

  const sortedOperatorDepositsTotalCount: OperatorDepositsTotalCount[] =
    Array.from(cache.operatorDepositsTotalCount.values())
      .sort((a, b) => b.totalDepositCount - a.totalDepositCount)
      .map(
        (n, key) =>
          new OperatorDepositsTotalCount({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedOperatorDepositsTotalValue: OperatorDepositsTotalValue[] =
    Array.from(cache.operatorDepositsTotalValue.values())
      .sort((a, b) =>
        a.totalDepositValue < b.totalDepositValue
          ? -1
          : a.totalDepositValue > b.totalDepositValue
          ? 1
          : 0
      )
      .map(
        (n, key) =>
          new OperatorDepositsTotalValue({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedOperatorWithdrawalsTotalCount: OperatorWithdrawalsTotalCount[] =
    Array.from(cache.operatorWithdrawalsTotalCount.values())
      .sort((a, b) => b.totalWithdrawalCount - a.totalWithdrawalCount)
      .map(
        (n, key) =>
          new OperatorWithdrawalsTotalCount({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedNominatorDepositsTotalCount: NominatorDepositsTotalCount[] =
    Array.from(cache.nominatorDepositsTotalCount.values())
      .sort((a, b) => b.totalDepositCount - a.totalDepositCount)
      .map(
        (n, key) =>
          new NominatorDepositsTotalCount({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedNominatorDepositsTotalValue: NominatorDepositsTotalValue[] =
    Array.from(cache.nominatorDepositsTotalValue.values())
      .sort((a, b) =>
        a.totalDepositValue < b.totalDepositValue
          ? -1
          : a.totalDepositValue > b.totalDepositValue
          ? 1
          : 0
      )
      .map(
        (n, key) =>
          new NominatorDepositsTotalValue({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  const sortedNominatorWithdrawalsTotalCount: NominatorWithdrawalsTotalCount[] =
    Array.from(cache.nominatorWithdrawalsTotalCount.values())
      .sort((a, b) => b.totalWithdrawalCount - a.totalWithdrawalCount)
      .map(
        (n, key) =>
          new NominatorWithdrawalsTotalCount({
            ...n,
            id: id(key),
            sortId: sortId(key),
          })
      );

  return {
    ...cache,
    farmerVoteTotalCount: new Map(
      sortedFarmerVoteTotalCount.map((n) => [n.id, n])
    ),
    farmerVoteTotalValue: new Map(
      sortedFarmerVoteTotalValue.map((n) => [n.id, n])
    ),
    farmerBlockTotalCount: new Map(
      sortedFarmerBlockTotalCount.map((n) => [n.id, n])
    ),
    farmerBlockTotalValue: new Map(
      sortedFarmerBlockTotalValue.map((n) => [n.id, n])
    ),
    farmerVoteAndBlockTotalCount: new Map(
      sortedFarmerVoteAndBlockTotalCount.map((n) => [n.id, n])
    ),
    farmerVoteAndBlockTotalValue: new Map(
      sortedFarmerVoteAndBlockTotalValue.map((n) => [n.id, n])
    ),
    operatorTotalRewardsCollected: new Map(
      sortedOperatorTotalRewardsCollected.map((n) => [n.id, n])
    ),
    operatorTotalTaxCollected: new Map(
      sortedOperatorTotalTaxCollected.map((n) => [n.id, n])
    ),
    operatorBundleTotalCount: new Map(
      sortedOperatorBundleTotalCount.map((n) => [n.id, n])
    ),
    operatorDepositsTotalCount: new Map(
      sortedOperatorDepositsTotalCount.map((n) => [n.id, n])
    ),
    operatorDepositsTotalValue: new Map(
      sortedOperatorDepositsTotalValue.map((n) => [n.id, n])
    ),
    operatorWithdrawalsTotalCount: new Map(
      sortedOperatorWithdrawalsTotalCount.map((n) => [n.id, n])
    ),
    nominatorDepositsTotalCount: new Map(
      sortedNominatorDepositsTotalCount.map((n) => [n.id, n])
    ),
    nominatorDepositsTotalValue: new Map(
      sortedNominatorDepositsTotalValue.map((n) => [n.id, n])
    ),
    nominatorWithdrawalsTotalCount: new Map(
      sortedNominatorWithdrawalsTotalCount.map((n) => [n.id, n])
    ),
  };
};
