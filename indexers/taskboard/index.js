const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { Queue: QueueMQ, Worker } = require("bullmq");
const Redis = require("ioredis");
const { ensureLoggedIn } = require("connect-ensure-login");

const NETWORKS = ["gemini-3h"];
const QUEUES = [
  {
    name: "accountBalanceUpdate",
    title: "Account Balance Update",
    enabled: true,
  },
  {
    name: "leaderboardSortAndRank",
    title: "Leaderboard Sort and Rank",
    enabled: false,
  },
  {
    name: "stackingUpdateOperator",
    title: "Stacking Update Operator",
    enabled: false,
  },
];

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

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t * 1000));

const connection = {
  port: process.env.REDIS_PORT ?? 6379,
  host: process.env.REDIS_HOST ?? "redis",
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    console.log(`Retrying Redis connection in ${delay}ms...`);
    return delay;
  },
};

async function checkRedisConnection() {
  const redis = new Redis(connection);
  return new Promise((resolve, reject) => {
    redis.on("ready", () => {
      console.log("Connected to Redis successfully!");
      redis.disconnect();
      resolve();
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err);
      redis.disconnect();
      reject(err);
    });
  });
}

const createQueueMQ = (name) => new QueueMQ(name, { connection });

async function setupBullMQProcessor(queueName) {
  new Worker(queueName, async (job) => {
    for (let i = 0; i <= 100; i++) {
      await sleep(Math.random());
      await job.updateProgress(i);
      await job.log(`Processing job at interval ${i}`);

      if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
    }
    return { jobId: `This is the return value of job (${job.id})` };
  });
}

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
      await setupBullMQProcessor(_queue.name);
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
    });

    serverAdapter.setBasePath(`/${network}`);
    app.use(`/${network}`, serverAdapter.getRouter());
    serverAdapters[network] = serverAdapter;
  }

  app.use("/add", (req, res) => {
    const opts = req.query.opts || {};
    if (opts.delay) opts.delay = +opts.delay * 1000;

    for (const network of NETWORKS) {
      queues[network][activeQueues[0].name].add(
        `Add ${network}`,
        { title: req.query.title },
        opts
      );
    }

    res.json({ ok: true });
  });

  app.use(bodyParser.json());
  app.post("/add-task", async (req, res) => {
    const { queueName, taskName, data, opts } = req.body;

    try {
      const queue = queues[queueName];
      if (!queue) return res.status(400).json({ error: "Invalid queue name" });

      await queue[activeQueues[0].name].add(taskName, data, opts);
      res.json({ ok: true, message: `Task added to ${queueName}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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
      `  curl http://localhost:${process.env.BULL_PORT}/add?title=Example`
    );
    console.log("To populate the queue with custom options (opts), run:");
    console.log(
      `  curl http://localhost:${process.env.BULL_PORT}/add?title=Test&opts[delay]=9`
    );
    console.log(
      "To add a task to the queue, send a POST request to /add-task with JSON body:"
    );
    console.log(`  {
      "queueName": "accounts",
      "taskName": "Test Task",
      "data": { "key": "value" },
      "opts": { "delay": 5000 }
    }`);
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
