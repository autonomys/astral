const NETWORKS = ["gemini-3h"];
const QUEUES = [
  {
    name: "accountBalanceUpdate",
    title: "Account Balance Update",
    enabled: true,
  },
  {
    name: "leaderboardSortAndRank",
    title: "Leaderboard Sort and Rank",
    enabled: false,
  },
  {
    name: "stackingUpdateOperator",
    title: "Stacking Update Operator",
    enabled: false,
  },
];

const JOB_RETENTION_HOURS = 24;
const GARBAGE_COLLECTION_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

const BULL_BOARD_OPTIONS = {
  uiConfig: {
    boardTitle: "Indexers Tasks",
    boardLogo: {
      path: "https://docs.autonomys.xyz/img/logo-white.png",
    },
  },
};

module.exports = {
  NETWORKS,
  QUEUES,
  JOB_RETENTION_HOURS,
  GARBAGE_COLLECTION_INTERVAL,
  BULL_BOARD_OPTIONS,
};
