const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { ensureLoggedIn } = require("connect-ensure-login");
const tasks = require("./tasks");
const { checkRedisConnection } = require("./utils/store");
const {
  NETWORKS,
  QUEUES,
  JOB_RETENTION_HOURS,
  GARBAGE_COLLECTION_INTERVAL,
  BULL_BOARD_OPTIONS,
} = require("./constants");
const {
  createQueueMQ,
  setupBullMQProcessor,
  cleanOldJobs,
} = require("./utils/bull");

passport.use(
  new LocalStrategy((username, password, cb) => {
    if (
      username === process.env.BULL_USERNAME &&
      password === process.env.BULL_PASSWORD
    ) {
      return cb(null, { user: "bull-board" });
    }
    return cb(null, false);
  })
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const run = async () => {
  await checkRedisConnection();
  const app = express();
  app.set("views", `${__dirname}/views`);
  app.set("view engine", "ejs");

  const activeQueues = QUEUES.filter((q) => q.enabled);

  const queues = {};
  const serverAdapters = {};

  for (const network of NETWORKS) {
    for (const queue of activeQueues) {
      const queueName = `${network} - ${queue.title}`;
      const _queue = createQueueMQ(queueName);
      const task = tasks[queue.name];
      if (task) {
        await setupBullMQProcessor(_queue.name, task);
      }
      if (!queues[network]) {
        queues[network] = {};
      }
      queues[network][queue.name] = _queue;
    }

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: activeQueues.map(
        (queue) => new BullMQAdapter(queues[network][queue.name])
      ),
      serverAdapter,
      options: BULL_BOARD_OPTIONS,
    });

    serverAdapter.setBasePath(`/${network}`);
    app.use(`/${network}`, serverAdapter.getRouter());
    serverAdapters[network] = serverAdapter;
  }

  for (const network of NETWORKS) {
    app.use(`/${network}/add`, async (req, res) => {
      const opts = req.query.opts || {};
      const jobId = req.query.jobId;

      if (!jobId) {
        return res.status(400).json({ error: "jobId is required" });
      }

      const queue = queues[network][activeQueues[0].name];
      const existingJob = await queue.getJob(jobId);

      if (
        existingJob &&
        !existingJob.isCompleted() &&
        !existingJob.isFailed()
      ) {
        return res.status(400).json({ error: "Job is already in progress" });
      }

      await queue.add(
        `Add ${network}`,
        { title: req.query.title },
        { ...opts, jobId }
      );

      res.json({ ok: true });
    });
  }

  app.use(bodyParser.json());
  app.post("/add-task", async (req, res) => {
    const { queueName, taskName, data, opts, jobId } = req.body;
    console.log("jobId: ", jobId);

    if (!jobId) {
      console.log("jobId is required");
      return res.status(400).json({ error: "jobId is required" });
    }

    try {
      const queue = queues[queueName];
      if (!queue) return res.status(400).json({ error: "Invalid queue name" });

      const existingTaskQueue = queue[taskName];
      if (!existingTaskQueue) {
        console.log("Invalid task name");
        return res.status(400).json({ error: "Invalid task name" });
      }
      const existingJob = await existingTaskQueue.getJob(jobId);

      if (
        existingJob &&
        !existingJob.isCompleted() &&
        !existingJob.isFailed()
      ) {
        console.log("Job is already in progress");
        return res.status(400).json({ error: "Job is already in progress" });
      }

      const job = await existingTaskQueue.add(taskName, data, {
        ...opts,
        jobId,
      });
      if (!job) {
        console.log("Failed to create task");
        return res.status(500).json({ error: "Failed to create task" });
      }
      res.json({
        ok: true,
        message: `Task added to ${queueName}`,
        jobId: job.id,
      });
    } catch (error) {
      console.log("Error adding task:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Schedule garbage collection to run every hour
  setInterval(async () => {
    for (const network in queues) {
      for (const queueName in queues[network]) {
        await cleanOldJobs(queues[network][queueName], JOB_RETENTION_HOURS);
      }
    }
  }, GARBAGE_COLLECTION_INTERVAL);

  app.listen(3000, () => {
    console.log(`Running on ${process.env.BULL_PORT}...`);
    NETWORKS.forEach((network) => {
      console.log(
        `For the UI of ${network}, open http://localhost:${process.env.BULL_PORT}/${network}`
      );
    });
    console.log("Make sure Redis is running on port 6379 by default");
    console.log("To populate the queue, run:");
    console.log(
      "To add a task to the queue, send a POST request to /<network>/add-task with JSON body:"
    );
    console.log(`  {
      "queueName": "gemini-3h",
      "taskName": "accountBalanceUpdate",
      "jobId": "123",
      "data": { "accountId": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "blockNumber": 10000000, "free": 1000000000000000000, "reserved": 1000000000000000000, "frozen": 1000000000000000000 },
      "opts": { "delay": 5000 }
    }`);
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
