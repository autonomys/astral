import { Queue } from 'bullmq';
import { Task } from '../tasks';

export interface CronQueue {
  queue: Queue;
  task: Task;
  name: string;
}

export const setupCronTasks = (cronQueue: CronQueue) => {
  if (!cronQueue.task.cron?.enabled) return;

  cronQueue.queue.add(
    cronQueue.name,
    {},
    {
      repeat: {
        pattern: cronQueue.task.cron.pattern,
      },
      jobId: `cron:${cronQueue.name}`,
    },
  );
};
