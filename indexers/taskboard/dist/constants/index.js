"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEADERBOARD_ENTRY_TYPE = exports.BULL_BOARD_OPTIONS = exports.GARBAGE_COLLECTION_INTERVAL = exports.JOB_RETENTION_HOURS = exports.TASKS_QUEUES = exports.QUEUES = void 0;
const NETWORK = process.env.NETWORK_ID || "mainnet";
exports.QUEUES = [NETWORK, "slack"];
exports.TASKS_QUEUES = [
    {
        queue: NETWORK,
        name: "consensusUniqueRowsMapping",
        title: "Consensus Unique Rows Mapping",
        enabled: true,
    },
    {
        queue: NETWORK,
        name: "leaderboardSortAndRank",
        title: "Leaderboard Sort and Rank",
        enabled: true,
    },
    {
        queue: NETWORK,
        name: "updateAccount",
        title: "Update Account",
        enabled: true,
    },
    {
        queue: "slack",
        name: "slackNotification",
        title: "Slack Notification",
        enabled: true,
    },
];
exports.JOB_RETENTION_HOURS = 24;
exports.GARBAGE_COLLECTION_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds
exports.BULL_BOARD_OPTIONS = {
    uiConfig: {
        boardTitle: "Indexers Tasks",
        boardLogo: {
            path: "https://docs.autonomys.xyz/img/logo-white.png",
        },
    },
};
exports.LEADERBOARD_ENTRY_TYPE = {
    ACCOUNT_TRANSFER_SENDER_TOTAL_COUNT: "AccountTransferSenderTotalCount",
    ACCOUNT_TRANSFER_SENDER_TOTAL_VALUE: "AccountTransferSenderTotalValue",
    ACCOUNT_TRANSFER_RECEIVER_TOTAL_COUNT: "AccountTransferReceiverTotalCount",
    ACCOUNT_TRANSFER_RECEIVER_TOTAL_VALUE: "AccountTransferReceiverTotalValue",
    ACCOUNT_REMARK_COUNT: "AccountRemarkCount",
    ACCOUNT_EXTRINSIC_TOTAL_COUNT: "AccountExtrinsicTotalCount",
    ACCOUNT_EXTRINSIC_SUCCESS_TOTAL_COUNT: "AccountExtrinsicSuccessTotalCount",
    ACCOUNT_EXTRINSIC_FAILED_TOTAL_COUNT: "AccountExtrinsicFailedTotalCount",
    ACCOUNT_TRANSACTION_FEE_PAID_TOTAL_VALUE: "AccountTransactionFeePaidTotalValue",
    FARMER_VOTE_TOTAL_COUNT: "FarmerVoteTotalCount",
    FARMER_VOTE_TOTAL_VALUE: "FarmerVoteTotalValue",
    FARMER_BLOCK_TOTAL_COUNT: "FarmerBlockTotalCount",
    FARMER_BLOCK_TOTAL_VALUE: "FarmerBlockTotalValue",
    FARMER_VOTE_AND_BLOCK_TOTAL_COUNT: "FarmerVoteAndBlockTotalCount",
    FARMER_VOTE_AND_BLOCK_TOTAL_VALUE: "FarmerVoteAndBlockTotalValue",
    OPERATOR_TOTAL_REWARDS_COLLECTED: "OperatorTotalRewardsCollected",
    OPERATOR_TOTAL_TAX_COLLECTED: "OperatorTotalTaxCollected",
    OPERATOR_BUNDLE_TOTAL_COUNT: "OperatorBundleTotalCount",
    OPERATOR_DEPOSITS_TOTAL_COUNT: "OperatorDepositsTotalCount",
    OPERATOR_DEPOSITS_TOTAL_VALUE: "OperatorDepositsTotalValue",
    OPERATOR_WITHDRAWALS_TOTAL_COUNT: "OperatorWithdrawalsTotalCount",
    NOMINATOR_DEPOSITS_TOTAL_COUNT: "NominatorDepositsTotalCount",
    NOMINATOR_DEPOSITS_TOTAL_VALUE: "NominatorDepositsTotalValue",
    NOMINATOR_WITHDRAWALS_TOTAL_COUNT: "NominatorWithdrawalsTotalCount",
};
