const { Queue: QueueMQ, Worker } = require("bullmq");
const { connection } = require("./store");

const createQueueMQ = (name) => new QueueMQ(name, { connection });

async function setupBullMQProcessor(queueName, task) {
  new Worker(queueName, task.handler, {
    connection,
    concurrency: task.concurrency,
  })
    .on("completed", (job) => {
      console.log(`Job ${job.id} has been completed`);
    })
    .on("failed", (job, err) => {
      console.error(`Job ${job.id} has failed with error ${err.message}`);
    });
}

async function cleanOldJobs(queue, hours) {
  const threshold = Date.now() - hours * 60 * 60 * 1000;
  const jobs = await queue.getJobs(["completed", "failed"]);
  for (const job of jobs) {
    if (job.finishedOn && job.finishedOn < threshold) {
      await job.remove();
      console.log(`Removed job ${job.id} from queue ${queue.name}`);
    }
  }
}

module.exports = {
  createQueueMQ,
  setupBullMQProcessor,
  cleanOldJobs,
};
