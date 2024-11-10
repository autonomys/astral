const { leaderboardSortAndRank } = require("./leaderboardSortAndRank");
const { consensusUniqueRowsMapping } = require("./consensus");
const { updateAccount } = require("./updateAccount");

const tasks = {
  consensusUniqueRowsMapping: {
    handler: consensusUniqueRowsMapping,
    concurrency: 1,
  },
  leaderboardSortAndRank: {
    handler: leaderboardSortAndRank,
    concurrency: 1,
  },
  updateAccount: {
    handler: updateAccount,
    concurrency: 1,
  },
};

module.exports = tasks;
