const { leaderboardSortAndRank } = require("./leaderboardSortAndRank");

const tasks = {
  leaderboardSortAndRank: {
    handler: leaderboardSortAndRank,
    concurrency: 1,
  },
};

module.exports = tasks;
