const { accountBalanceUpdate } = require("./accountBalanceUpdate");
const { leaderboardSortAndRank } = require("./leaderboardSortAndRank");

const tasks = {
  accountBalanceUpdate: {
    handler: accountBalanceUpdate,
    concurrency: 1,
  },
  leaderboardSortAndRank: {
    handler: leaderboardSortAndRank,
    concurrency: 1,
  },
};

module.exports = tasks;
