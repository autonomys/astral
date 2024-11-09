import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import bodyParser from "body-parser";
import { ensureLoggedIn } from "connect-ensure-login";
import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import {
  BULL_BOARD_OPTIONS,
  GARBAGE_COLLECTION_INTERVAL,
  JOB_RETENTION_HOURS,
  QUEUES,
  TASKS_QUEUES,
} from "./constants";
import { tasks } from "./tasks";
import {
  cleanOldJobs,
  createQueueMQ,
  setupBullMQProcessor,
} from "./utils/bull";
import { checkRedisConnection } from "./utils/store";

passport.use(
  "api",
  new LocalStrategy.Strategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, cb) => {
      if (
        username === process.env.BULL_USERNAME &&
        password === process.env.BULL_PASSWORD
      ) {
        return cb(null, { user: "bull-board" });
      }
      return cb(null, false);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const run = async () => {
  await checkRedisConnection();
  const app: Express = express();

  app.set("views", `${__dirname}/views`);
  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.render("index", { queues: QUEUES });
  });
  const tasksQueues = {};
  const serverAdapters = {};

  for (const queue of QUEUES) {
    const activeTasksQueues = TASKS_QUEUES.filter(
      (q) => q.queue === queue && q.enabled
    );

    for (const tasksQueue of activeTasksQueues) {
      const queueName = `${queue} - ${tasksQueue.title}`;
      const _queue = createQueueMQ(queueName);
      const task = tasks[tasksQueue.name];
      if (task) {
        await setupBullMQProcessor(_queue.name, task);
      }
      if (!tasksQueues[queue]) {
        tasksQueues[queue] = {};
      }
      tasksQueues[queue][tasksQueue.name] = _queue;
    }

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: activeTasksQueues.map(
        (q) => new BullMQAdapter(tasksQueues[queue][q.name])
      ),
      serverAdapter,
      options: BULL_BOARD_OPTIONS,
    });

    serverAdapter.setBasePath(`/${queue}`);
    app.use(`/${queue}`, serverAdapter.getRouter());
    serverAdapters[queue] = serverAdapter;
  }

  for (const queue of QUEUES) {
    const activeTasksQueues = TASKS_QUEUES.filter(
      (q) => q.queue === queue && q.enabled
    );

    app.use(
      `/${queue}/add`,
      // @ts-ignore express types
      async (req: any, res: Response<any, Record<string, any>, number>) => {
        const opts = req.query.opts || {};
        const jobId = req.query.jobId;

        if (!jobId) {
          return res.status(400).json({ error: "jobId is required" });
        }

        const tasksQueue = tasksQueues[queue][activeTasksQueues[0].name];
        const existingJob = await tasksQueue.getJob(jobId);

        if (
          existingJob &&
          !existingJob.isCompleted() &&
          !existingJob.isFailed()
        ) {
          return res.status(400).json({ error: "Job is already in progress" });
        }

        await tasksQueue.add(
          `Add ${queue}`,
          { title: req.query.title },
          { ...opts, jobId }
        );

        res.json({ ok: true });
      }
    );
  }

  app.use(bodyParser.json());

  // @ts-ignore express types
  app.post("/add-task", async (req, res) => {
    let { queueName, taskName, data, opts, jobId } = req.body;
    if (req.body.action) {
      taskName = req.body.action.name;
      ({ queueName, data, opts, jobId } = req.body.input.args);
    }
    console.log("jobId: ", jobId);

    if (!jobId) {
      console.log("jobId is required");
      return res.status(400).json({ error: "jobId is required" });
    }

    try {
      const tasksQueue = tasksQueues[queueName];
      if (!tasksQueue)
        return res.status(400).json({ error: "Invalid queue name" });

      const existingTaskQueue = tasksQueue[taskName];
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
    for (const queue in tasksQueues) {
      for (const queueName in tasksQueues[queue]) {
        await cleanOldJobs(tasksQueues[queue][queueName], JOB_RETENTION_HOURS);
      }
    }
  }, GARBAGE_COLLECTION_INTERVAL);

  app.listen(process.env.BULL_PORT || 3020, () => {
    console.log(`Running on ${process.env.BULL_PORT}...`);
    QUEUES.forEach((queue) => {
      console.log(
        `For the UI of ${queue}, open http://localhost:${process.env.BULL_PORT}/${queue}`
      );
    });
    console.log("Make sure Redis is running on port 6379 by default");
    console.log("To populate the queue, run:");
    console.log(
      "To add a task to the queue, send a POST request to /<queue>/add-task with JSON body:"
    );
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
