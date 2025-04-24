import { Cache, CachedLeaderboardEntity } from "../types/cache.ts";
import { sql } from "./client.ts";
import { insert } from "./helper.ts";

export const insertLeaderboard = async (
  leaderboard: CachedLeaderboardEntity[],
  table: string,
  sqlClient?: typeof sql
) => {
  if (leaderboard.length === 0) return;

  const values = leaderboard.map((row) => [
    row.id,
    row.accountId,
    row.value.toString(),
    row.lastContributionAt,
    row.blockId,
    row.blockHeight.toString(),
    row.extrinsicId,
    row.eventId,
  ]);
  const columns = [
    "id",
    "account_id",
    "value",
    "last_contribution_at",
    "block_id",
    "block_height",
    "extrinsic_id",
    "event_id",
  ];
  return await insert(`leaderboard.${table}`, columns, values, sqlClient);
};

export const insertCachedLeaderboardData = (
  cache: Cache,
  txSql: typeof sql
) => {
  const promises = [];

  if (cache.accountExtrinsicFailedTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountExtrinsicFailedTotalCountHistory,
        "account_extrinsic_failed_total_count_histories",
        txSql
      )
    );

  if (cache.accountExtrinsicSuccessTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountExtrinsicSuccessTotalCountHistory,
        "account_extrinsic_success_total_count_histories",
        txSql
      )
    );

  if (cache.accountExtrinsicTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountExtrinsicTotalCountHistory,
        "account_extrinsic_total_count_histories",
        txSql
      )
    );

  if (cache.accountRemarkCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountRemarkCountHistory,
        "account_remark_count_histories",
        txSql
      )
    );

  if (cache.accountTransactionFeePaidTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountTransactionFeePaidTotalValueHistory,
        "account_transaction_fee_paid_total_value_histories",
        txSql
      )
    );

  if (cache.accountTransferReceiverTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountTransferReceiverTotalCountHistory,
        "account_transfer_receiver_total_count_histories",
        txSql
      )
    );

  if (cache.accountTransferReceiverTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountTransferReceiverTotalValueHistory,
        "account_transfer_receiver_total_value_histories",
        txSql
      )
    );

  if (cache.accountTransferSenderTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountTransferSenderTotalCountHistory,
        "account_transfer_sender_total_count_histories",
        txSql
      )
    );

  if (cache.accountTransferSenderTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.accountTransferSenderTotalValueHistory,
        "account_transfer_sender_total_value_histories",
        txSql
      )
    );

  if (cache.farmerBlockTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerBlockTotalCountHistory,
        "farmer_block_total_count_histories",
        txSql
      )
    );

  if (cache.farmerBlockTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerBlockTotalValueHistory,
        "farmer_block_total_value_histories",
        txSql
      )
    );

  if (cache.farmerVoteAndBlockTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerVoteAndBlockTotalCountHistory,
        "farmer_vote_and_block_total_count_histories",
        txSql
      )
    );

  if (cache.farmerVoteAndBlockTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerVoteAndBlockTotalValueHistory,
        "farmer_vote_and_block_total_value_histories",
        txSql
      )
    );

  if (cache.farmerVoteTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerVoteTotalCountHistory,
        "farmer_vote_total_count_histories",
        txSql
      )
    );

  if (cache.farmerVoteTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.farmerVoteTotalValueHistory,
        "farmer_vote_total_value_histories",
        txSql
      )
    );

  if (cache.nominatorDepositsTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.nominatorDepositsTotalCountHistory,
        "nominator_deposits_total_count_histories",
        txSql
      )
    );

  if (cache.nominatorDepositsTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.nominatorDepositsTotalValueHistory,
        "nominator_deposits_total_value_histories",
        txSql
      )
    );

  if (cache.nominatorWithdrawalsTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.nominatorWithdrawalsTotalCountHistory,
        "nominator_withdrawals_total_count_histories",
        txSql
      )
    );

  if (cache.nominatorWithdrawalsTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.nominatorWithdrawalsTotalValueHistory,
        "nominator_withdrawals_total_value_histories",
        txSql
      )
    );

  if (cache.operatorBundleTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorBundleTotalCountHistory,
        "operator_bundle_total_count_histories",
        txSql
      )
    );

  if (cache.operatorDepositsTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorDepositsTotalCountHistory,
        "operator_deposits_total_count_histories",
        txSql
      )
    );

  if (cache.operatorDepositsTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorDepositsTotalValueHistory,
        "operator_deposits_total_value_histories",
        txSql
      )
    );

  if (cache.operatorTotalRewardsCollectedHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorTotalRewardsCollectedHistory,
        "operator_total_rewards_collected_histories",
        txSql
      )
    );

  if (cache.operatorTotalTaxCollectedHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorTotalTaxCollectedHistory,
        "operator_total_tax_collected_histories",
        txSql
      )
    );

  if (cache.operatorWithdrawalsTotalCountHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorWithdrawalsTotalCountHistory,
        "operator_withdrawals_total_count_histories",
        txSql
      )
    );

  if (cache.operatorWithdrawalsTotalValueHistory.length > 0)
    promises.push(
      insertLeaderboard(
        cache.operatorWithdrawalsTotalValueHistory,
        "operator_withdrawals_total_value_histories",
        txSql
      )
    );

  if (promises.length === 0) return [];

  return promises;
};
