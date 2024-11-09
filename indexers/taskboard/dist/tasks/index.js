"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const consensus_1 = require("./consensus");
const leaderboardSortAndRank_1 = require("./leaderboardSortAndRank");
const slackNotification_1 = require("./slackNotification");
const updateAccount_1 = require("./updateAccount");
exports.tasks = {
    consensusUniqueRowsMapping: {
        handler: consensus_1.consensusUniqueRowsMapping,
        concurrency: 1,
    },
    leaderboardSortAndRank: {
        handler: leaderboardSortAndRank_1.leaderboardSortAndRank,
        concurrency: 1,
    },
    updateAccount: {
        handler: updateAccount_1.updateAccount,
        concurrency: 1,
    },
    slackNotification: {
        handler: slackNotification_1.slackNotification,
        concurrency: 1,
    },
};
