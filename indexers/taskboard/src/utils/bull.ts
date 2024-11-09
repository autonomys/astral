import { Job, Queue as QueueMQ, Worker } from "bullmq";
import { connection } from "./store";

interface Task {
  handler: (job: Job) => Promise<void>;
  concurrency: number;
}

const createQueueMQ = (name: string): QueueMQ =>
  new QueueMQ(name, { connection });

async function setupBullMQProcessor(
  queueName: string,
  task: Task
): Promise<void> {
  new Worker(queueName, task.handler, {
    connection,
    concurrency: task.concurrency,
  })
    .on("completed", (job: Job) => {
      console.log(`Job ${job.id} has been completed`);
    })
    .on("failed", (job: Job, err: Error) => {
      console.error(`Job ${job.id} has failed with error ${err.message}`);
    });
}

async function cleanOldJobs(queue: QueueMQ, hours: number): Promise<void> {
  const threshold = Date.now() - hours * 60 * 60 * 1000;
  const jobs = await queue.getJobs(["completed", "failed"]);
  for (const job of jobs) {
    if (job.finishedOn && job.finishedOn < threshold) {
      await job.remove();
      console.log(`Removed job ${job.id} from queue ${queue.name}`);
    }
  }
}

export { cleanOldJobs, createQueueMQ, setupBullMQProcessor, Task };
