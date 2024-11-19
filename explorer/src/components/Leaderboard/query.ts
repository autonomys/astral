import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_COUNT = gql`
  query AccountTransferSenderTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_transfer_sender_total_counts_order_by!]!
    $where: leaderboard_account_transfer_sender_total_counts_bool_exp
  ) {
    leaderboard_account_transfer_sender_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_account_transfer_sender_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      lastContributionAt: last_contribution_at
      createdAt: created_at
      updatedAt: updated_at
    }
  }
`

export const QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_VALUE = gql`
  query AccountTransferSenderTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_transfer_sender_total_values_order_by!]!
    $where: leaderboard_account_transfer_sender_total_values_bool_exp
  ) {
    leaderboard_account_transfer_sender_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_account_transfer_sender_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_TRANSFER_RECEIVER_TOTAL_COUNT = gql`
  query AccountTransferReceiverTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_transfer_receiver_total_counts_order_by!]!
    $where: leaderboard_account_transfer_receiver_total_counts_bool_exp
  ) {
    leaderboard_account_transfer_receiver_total_counts_aggregate(
      order_by: $orderBy
      where: $where
    ) {
      aggregate {
        count
      }
    }
    leaderboard_account_transfer_receiver_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_TRANSFER_RECEIVER_TOTAL_VALUE = gql`
  query AccountTransferReceiverTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_transfer_receiver_total_values_order_by!]!
    $where: leaderboard_account_transfer_receiver_total_values_bool_exp
  ) {
    leaderboard_account_transfer_receiver_total_values_aggregate(
      order_by: $orderBy
      where: $where
    ) {
      aggregate {
        count
      }
    }
    leaderboard_account_transfer_receiver_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_REMARK_COUNT = gql`
  query AccountRemarkCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_remark_counts_order_by!]!
    $where: leaderboard_account_remark_counts_bool_exp
  ) {
    leaderboard_account_remark_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_account_remark_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_EXTRINSIC_TOTAL_COUNT = gql`
  query AccountExtrinsicTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_extrinsic_total_counts_order_by!]!
    $where: leaderboard_account_extrinsic_total_counts_bool_exp
  ) {
    leaderboard_account_extrinsic_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_account_extrinsic_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_EXTRINSIC_SUCCESS_TOTAL_COUNT = gql`
  query AccountExtrinsicSuccessTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_extrinsic_success_total_counts_order_by!]!
    $where: leaderboard_account_extrinsic_success_total_counts_bool_exp
  ) {
    leaderboard_account_extrinsic_success_total_counts_aggregate(
      order_by: $orderBy
      where: $where
    ) {
      aggregate {
        count
      }
    }
    leaderboard_account_extrinsic_success_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_EXTRINSIC_FAILED_TOTAL_COUNT = gql`
  query AccountExtrinsicFailedTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_extrinsic_failed_total_counts_order_by!]!
    $where: leaderboard_account_extrinsic_failed_total_counts_bool_exp
  ) {
    leaderboard_account_extrinsic_failed_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_account_extrinsic_failed_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNT_TRANSACTION_FEE_PAID_TOTAL_VALUE = gql`
  query AccountTransactionFeePaidTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_account_transaction_fee_paid_total_values_order_by!]!
    $where: leaderboard_account_transaction_fee_paid_total_values_bool_exp
  ) {
    leaderboard_account_transaction_fee_paid_total_values_aggregate(
      order_by: $orderBy
      where: $where
    ) {
      aggregate {
        count
      }
    }
    leaderboard_account_transaction_fee_paid_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_VOTE_TOTAL_COUNT = gql`
  query FarmerVoteTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_vote_total_counts_order_by!]!
    $where: leaderboard_farmer_vote_total_counts_bool_exp
  ) {
    leaderboard_farmer_vote_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_vote_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_VOTE_TOTAL_VALUE = gql`
  query FarmerVoteTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_vote_total_values_order_by!]!
    $where: leaderboard_farmer_vote_total_values_bool_exp
  ) {
    leaderboard_farmer_vote_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_vote_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_BLOCK_TOTAL_COUNT = gql`
  query FarmerBlockTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_block_total_counts_order_by!]!
    $where: leaderboard_farmer_block_total_counts_bool_exp
  ) {
    leaderboard_farmer_block_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_block_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_BLOCK_TOTAL_VALUE = gql`
  query FarmerBlockTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_block_total_values_order_by!]!
    $where: leaderboard_farmer_block_total_values_bool_exp
  ) {
    leaderboard_farmer_block_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_block_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_TOTAL_REWARDS_COLLECTED = gql`
  query OperatorTotalRewardsCollected(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_total_rewards_collecteds_order_by!]!
    $where: leaderboard_operator_total_rewards_collecteds_bool_exp
  ) {
    leaderboard_operator_total_rewards_collecteds_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_total_rewards_collecteds(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_TOTAL_TAX_COLLECTED = gql`
  query OperatorTotalTaxCollected(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_total_tax_collecteds_order_by!]!
    $where: leaderboard_operator_total_tax_collecteds_bool_exp
  ) {
    leaderboard_operator_total_tax_collecteds_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_total_tax_collecteds(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_BUNDLE_TOTAL_COUNT = gql`
  query OperatorBundleTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_bundle_total_counts_order_by!]!
    $where: leaderboard_operator_bundle_total_counts_bool_exp
  ) {
    leaderboard_operator_bundle_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_bundle_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_DEPOSITS_TOTAL_COUNT = gql`
  query OperatorDepositsTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_deposits_total_counts_order_by!]!
    $where: leaderboard_operator_deposits_total_counts_bool_exp
  ) {
    leaderboard_operator_deposits_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_deposits_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_DEPOSITS_TOTAL_VALUE = gql`
  query OperatorDepositsTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_deposits_total_values_order_by!]!
    $where: leaderboard_operator_deposits_total_values_bool_exp
  ) {
    leaderboard_operator_deposits_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_deposits_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_WITHDRAWALS_TOTAL_COUNT = gql`
  query OperatorWithdrawalsTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_operator_withdrawals_total_counts_order_by!]!
    $where: leaderboard_operator_withdrawals_total_counts_bool_exp
  ) {
    leaderboard_operator_withdrawals_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_operator_withdrawals_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_NOMINATOR_DEPOSITS_TOTAL_COUNT = gql`
  query NominatorDepositsTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_nominator_deposits_total_counts_order_by!]!
    $where: leaderboard_nominator_deposits_total_counts_bool_exp
  ) {
    leaderboard_nominator_deposits_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_nominator_deposits_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_NOMINATOR_DEPOSITS_TOTAL_VALUE = gql`
  query NominatorDepositsTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_nominator_deposits_total_values_order_by!]!
    $where: leaderboard_nominator_deposits_total_values_bool_exp
  ) {
    leaderboard_nominator_deposits_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_nominator_deposits_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_NOMINATOR_WITHDRAWALS_TOTAL_COUNT = gql`
  query NominatorWithdrawalsTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_nominator_withdrawals_total_counts_order_by!]!
    $where: leaderboard_nominator_withdrawals_total_counts_bool_exp
  ) {
    leaderboard_nominator_withdrawals_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_nominator_withdrawals_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_VOTE_AND_BLOCK_TOTAL_COUNT = gql`
  query FarmerVoteAndBlockTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_vote_and_block_total_counts_order_by!]!
    $where: leaderboard_farmer_vote_and_block_total_counts_bool_exp
  ) {
    leaderboard_farmer_vote_and_block_total_counts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_vote_and_block_total_counts(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`

export const QUERY_FARMER_VOTE_AND_BLOCK_TOTAL_VALUE = gql`
  query FarmerVoteAndBlockTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [leaderboard_farmer_vote_and_block_total_values_order_by!]!
    $where: leaderboard_farmer_vote_and_block_total_values_bool_exp
  ) {
    leaderboard_farmer_vote_and_block_total_values_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    leaderboard_farmer_vote_and_block_total_values(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      rank
      value
      last_contribution_at
      created_at
      updated_at
    }
  }
`
