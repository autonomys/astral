import { leaderboardSortAndRank } from "./leaderboardSortAndRank";
import { slackNotification } from "./slackNotification";
import { updateBlockchainStats } from "./updateBlockchainStats";
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
  leaderboardSortAndRank: {
    handler: leaderboardSortAndRank,
    concurrency: 1,
    cron: {
      pattern: "*/2 * * * *", // Runs every 2 minutes
      enabled: true,
    },
  },
  updateBlockchainStats: {
    handler: updateBlockchainStats,
    concurrency: 1,
    cron: {
      pattern: "*/5 * * * *", // Runs every 5 minutes
      enabled: true,
    },
  },
  slackNotification: {
    handler: slackNotification,
    concurrency: 1,
  },
};
