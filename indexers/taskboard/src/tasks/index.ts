import { consensusUniqueRowsMapping } from "./consensus";
import { leaderboardSortAndRank } from "./leaderboardSortAndRank";
import { slackNotification } from "./slackNotification";
import { updateAccount } from "./updateAccount";

interface CronConfig {
  pattern: string;
  enabled: boolean;
}

export interface Task {
  handler: (...args: any[]) => Promise<any>;
  concurrency: number;
  cron?: CronConfig;
}

interface Tasks {
  [key: string]: Task;
}

export const tasks: Tasks = {
  consensusUniqueRowsMapping: {
    handler: consensusUniqueRowsMapping,
    concurrency: 1,
    cron: {
      pattern: "*/1 * * * *", // Runs every 1 minute
      enabled: true,
    },
  },
  leaderboardSortAndRank: {
    handler: leaderboardSortAndRank,
    concurrency: 1,
  },
  updateAccount: {
    handler: updateAccount,
    concurrency: 1,
  },
  slackNotification: {
    handler: slackNotification,
    concurrency: 1,
  },
};
