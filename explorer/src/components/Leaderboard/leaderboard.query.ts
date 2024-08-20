import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_COUNT = gql`
  query AccountTransferSenderTotalCount(
    $limit: Int!
    $offset: Int
    $orderBy: [account_transfer_sender_total_count_order_by!]!
    $where: account_transfer_sender_total_count_bool_exp
  ) {
    account_transfer_sender_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_transfer_sender_total_count(
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

export const QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_VALUE = gql`
  query AccountTransferSenderTotalValue(
    $limit: Int!
    $offset: Int
    $orderBy: [account_transfer_sender_total_value_order_by!]!
    $where: account_transfer_sender_total_value_bool_exp
  ) {
    account_transfer_sender_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_transfer_sender_total_value(
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
    $orderBy: [account_transfer_receiver_total_count_order_by!]!
    $where: account_transfer_receiver_total_count_bool_exp
  ) {
    account_transfer_receiver_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_transfer_receiver_total_count(
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
    $orderBy: [account_transfer_receiver_total_value_order_by!]!
    $where: account_transfer_receiver_total_value_bool_exp
  ) {
    account_transfer_receiver_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_transfer_receiver_total_value(
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
    $orderBy: [account_remark_count_order_by!]!
    $where: account_remark_count_bool_exp
  ) {
    account_remark_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_remark_count(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [account_extrinsic_total_count_order_by!]!
    $where: account_extrinsic_total_count_bool_exp
  ) {
    account_extrinsic_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_extrinsic_total_count(
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
    $orderBy: [account_extrinsic_success_total_count_order_by!]!
    $where: account_extrinsic_success_total_count_bool_exp
  ) {
    account_extrinsic_success_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_extrinsic_success_total_count(
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
    $orderBy: [account_extrinsic_failed_total_count_order_by!]!
    $where: account_extrinsic_failed_total_count_bool_exp
  ) {
    account_extrinsic_failed_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_extrinsic_failed_total_count(
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
    $orderBy: [account_transaction_fee_paid_total_value_order_by!]!
    $where: account_transaction_fee_paid_total_value_bool_exp
  ) {
    account_transaction_fee_paid_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_transaction_fee_paid_total_value(
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
    $orderBy: [farmer_vote_total_count_order_by!]!
    $where: farmer_vote_total_count_bool_exp
  ) {
    farmer_vote_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_vote_total_count(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [farmer_vote_total_value_order_by!]!
    $where: farmer_vote_total_value_bool_exp
  ) {
    farmer_vote_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_vote_total_value(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [farmer_block_total_count_order_by!]!
    $where: farmer_block_total_count_bool_exp
  ) {
    farmer_block_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_block_total_count(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [farmer_block_total_value_order_by!]!
    $where: farmer_block_total_value_bool_exp
  ) {
    farmer_block_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_block_total_value(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [operator_total_rewards_collected_order_by!]!
    $where: operator_total_rewards_collected_bool_exp
  ) {
    operator_total_rewards_collected_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_total_rewards_collected(
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
    $orderBy: [operator_total_tax_collected_order_by!]!
    $where: operator_total_tax_collected_bool_exp
  ) {
    operator_total_tax_collected_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_total_tax_collected(
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
    $orderBy: [operator_bundle_total_count_order_by!]!
    $where: operator_bundle_total_count_bool_exp
  ) {
    operator_bundle_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_bundle_total_count(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    $orderBy: [operator_deposits_total_count_order_by!]!
    $where: operator_deposits_total_count_bool_exp
  ) {
    operator_deposits_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_deposits_total_count(
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
    $orderBy: [operator_deposits_total_value_order_by!]!
    $where: operator_deposits_total_value_bool_exp
  ) {
    operator_deposits_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_deposits_total_value(
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
    $orderBy: [operator_withdrawals_total_count_order_by!]!
    $where: operator_withdrawals_total_count_bool_exp
  ) {
    operator_withdrawals_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator_withdrawals_total_count(
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
    $orderBy: [nominator_deposits_total_count_order_by!]!
    $where: nominator_deposits_total_count_bool_exp
  ) {
    nominator_deposits_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    nominator_deposits_total_count(
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
    $orderBy: [nominator_deposits_total_value_order_by!]!
    $where: nominator_deposits_total_value_bool_exp
  ) {
    nominator_deposits_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    nominator_deposits_total_value(
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
    $orderBy: [nominator_withdrawals_total_count_order_by!]!
    $where: nominator_withdrawals_total_count_bool_exp
  ) {
    nominator_withdrawals_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    nominator_withdrawals_total_count(
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
    $orderBy: [farmer_vote_and_block_total_count_order_by!]!
    $where: farmer_vote_and_block_total_count_bool_exp
  ) {
    farmer_vote_and_block_total_count_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_vote_and_block_total_count(
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
    $orderBy: [farmer_vote_and_block_total_value_order_by!]!
    $where: farmer_vote_and_block_total_value_bool_exp
  ) {
    farmer_vote_and_block_total_value_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    farmer_vote_and_block_total_value(
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
