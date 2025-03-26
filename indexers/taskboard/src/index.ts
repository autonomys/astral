import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import express, { Express } from "express";
import session from "express-session";
import Redis from "ioredis";
import passport from "passport";
import LocalStrategy from "passport-local";
import {
  BULL_BOARD_OPTIONS,
  GARBAGE_COLLECTION_INTERVAL,
  JOB_RETENTION_HOURS,
  QUEUES,
  ROUTES,
  TASKS_QUEUES,
  VIEWS,
} from "./constants";
import { tasks } from "./tasks";
import {
  cleanOldJobs,
  createQueueMQ,
  setupBullMQProcessor,
} from "./utils/bull";
import { setupCronTasks } from "./utils/cron";
import { log, returnError } from "./utils/helper";
import { checkRedisConnection, connection } from "./utils/store";

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
  }
}

const SESSION_SECRET = process.env.BULL_SESSION_SECRET || "keyboard cat";
const BULL_BASE_PATH = (process.env.BULL_BASE_PATH || "/bullmq").replace(
  /\/$/,
  ""
);

passport.use(
  "api",
  new LocalStrategy.Strategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, cb) => {
      if (
        username === process.env.BULL_USERNAME &&
        password === process.env.BULL_PASSWORD
      )
        return cb(null, { user: "bull-board" });
      return cb(null, false);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const run = async () => {
  await checkRedisConnection();
  const app: Express = express();
  const RedisClient = new Redis(connection);

  const tasksQueues = {};
  const serverAdapters = {};

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: RedisClient }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());

  app.set("views", `${__dirname}/views`);
  app.set("view engine", "ejs");

  const bullRouter = express.Router();

  bullRouter.get(ROUTES.LOGIN, (req, res) => {
    res.render(VIEWS.LOGIN, {
      invalid: false,
      loginUrl: `${BULL_BASE_PATH}${ROUTES.LOGIN}`,
    });
  });
  bullRouter.get(ROUTES.DASHBOARD, (req, res) => {
    if (req.session.authenticated)
      res.render(VIEWS.DASHBOARD, { queues: QUEUES });
    else res.redirect(`${BULL_BASE_PATH}${ROUTES.LOGIN}`);
  });

  bullRouter.post(
    ROUTES.POST_LOGIN,
    express.urlencoded({ extended: true }),
    (req, res) => {
      const { username, password } = req.body;
      if (
        username === process.env.BULL_USERNAME &&
        password === process.env.BULL_PASSWORD
      ) {
        req.session.authenticated = true;
        res.redirect(`${BULL_BASE_PATH}${ROUTES.DASHBOARD}`);
      } else
        res.render(VIEWS.LOGIN, {
          invalid: true,
          loginUrl: `${BULL_BASE_PATH}${ROUTES.LOGIN}`,
        });
    }
  );

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
        if (task.cron?.enabled)
          setupCronTasks({
            queue: _queue,
            task: task,
            name: tasksQueue.name,
          });
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

    serverAdapter.setBasePath(`${BULL_BASE_PATH}/${queue}`);

    bullRouter.use(`/${queue}`, (req, res) => {
      if (req.session.authenticated) serverAdapter.getRouter()(req, res);
      else res.redirect(ROUTES.LOGIN);
    });
    serverAdapters[queue] = serverAdapter;
  }

  bullRouter.post(ROUTES.POST_ADD_TASK, async (req, res) => {
    log("req.body: ", req.body);
    let { queueName, taskName, data, opts, jobId } = req.body;

    // Handle Hasura action
    if (req.body.action) {
      if (req.headers.taskboard_session_secret !== SESSION_SECRET)
        returnError(res, "Invalid session secret");
      const requestId = req.headers["x-request-id"];
      if (!requestId) returnError(res, "Request ID is required");

      log("Hasura action: ", req.body.action);
      const matchingTask = TASKS_QUEUES.find(
        (t) => t.name === req.body.action.name
      );
      if (!matchingTask) returnError(res, "Invalid task name");

      // Infer queue, task name and jobId from action request
      queueName = matchingTask.queue;
      taskName = matchingTask.name;
      jobId = `${queueName}:${taskName}:hasura:${requestId}`;
      data = req.body.input.args;
    }

    console.log("jobId: ", jobId);
    if (!jobId) returnError(res, "jobId is required");

    try {
      const tasksQueue = tasksQueues[queueName];
      if (!tasksQueue) returnError(res, "Invalid queue name");

      const existingTaskQueue = tasksQueue[taskName];
      if (!existingTaskQueue) returnError(res, "Invalid task name");
      const existingJob = await existingTaskQueue.getJob(jobId);

      if (existingJob && !existingJob.isCompleted() && !existingJob.isFailed())
        returnError(res, "Job is already in progress");

      const job = await existingTaskQueue.add(taskName, data, {
        ...opts,
        jobId,
      });
      if (!job) returnError(res, "Failed to create task", 500);

      res.send({
        ok: true,
        message: `Task added to ${queueName}`,
        jobId: job.id,
      });
    } catch (error) {
      log("Error adding task:", error);
      returnError(res, error.message, 500);
    }
  });

  app.use("/", bullRouter);

  // Schedule garbage collection to run every hour
  setInterval(async () => {
    for (const queue in tasksQueues) {
      for (const queueName in tasksQueues[queue]) {
        await cleanOldJobs(tasksQueues[queue][queueName], JOB_RETENTION_HOURS);
      }
    }
  }, GARBAGE_COLLECTION_INTERVAL);

  app.listen(process.env.BULL_PORT || 3020, () => {
    console.log(`Running on port ${process.env.BULL_PORT}...`);
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
