"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const body_parser_1 = __importDefault(require("body-parser"));
const express_2 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const constants_1 = require("./constants");
const tasks_1 = require("./tasks");
const bull_1 = require("./utils/bull");
const store_1 = require("./utils/store");
passport_1.default.use("api", new passport_local_1.default.Strategy({ usernameField: "username", passwordField: "password" }, (username, password, cb) => {
    if (username === process.env.BULL_USERNAME &&
        password === process.env.BULL_PASSWORD) {
        return cb(null, { user: "bull-board" });
    }
    return cb(null, false);
}));
passport_1.default.serializeUser((user, cb) => cb(null, user));
passport_1.default.deserializeUser((user, cb) => cb(null, user));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, store_1.checkRedisConnection)();
    const app = (0, express_2.default)();
    app.set("views", `${__dirname}/views`);
    app.set("view engine", "ejs");
    app.get("/", (req, res) => {
        res.render("index", { queues: constants_1.QUEUES });
    });
    const tasksQueues = {};
    const serverAdapters = {};
    for (const queue of constants_1.QUEUES) {
        const activeTasksQueues = constants_1.TASKS_QUEUES.filter((q) => q.queue === queue && q.enabled);
        for (const tasksQueue of activeTasksQueues) {
            const queueName = `${queue} - ${tasksQueue.title}`;
            const _queue = (0, bull_1.createQueueMQ)(queueName);
            const task = tasks_1.tasks[tasksQueue.name];
            if (task) {
                yield (0, bull_1.setupBullMQProcessor)(_queue.name, task);
            }
            if (!tasksQueues[queue]) {
                tasksQueues[queue] = {};
            }
            tasksQueues[queue][tasksQueue.name] = _queue;
        }
        const serverAdapter = new express_1.ExpressAdapter();
        (0, api_1.createBullBoard)({
            queues: activeTasksQueues.map((q) => new bullMQAdapter_1.BullMQAdapter(tasksQueues[queue][q.name])),
            serverAdapter,
            options: constants_1.BULL_BOARD_OPTIONS,
        });
        serverAdapter.setBasePath(`/${queue}`);
        app.use(`/${queue}`, serverAdapter.getRouter());
        serverAdapters[queue] = serverAdapter;
    }
    for (const queue of constants_1.QUEUES) {
        const activeTasksQueues = constants_1.TASKS_QUEUES.filter((q) => q.queue === queue && q.enabled);
        app.use(`/${queue}/add`, 
        // @ts-ignore express types
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const opts = req.query.opts || {};
            const jobId = req.query.jobId;
            if (!jobId) {
                return res.status(400).json({ error: "jobId is required" });
            }
            const tasksQueue = tasksQueues[queue][activeTasksQueues[0].name];
            const existingJob = yield tasksQueue.getJob(jobId);
            if (existingJob &&
                !existingJob.isCompleted() &&
                !existingJob.isFailed()) {
                return res.status(400).json({ error: "Job is already in progress" });
            }
            yield tasksQueue.add(`Add ${queue}`, { title: req.query.title }, Object.assign(Object.assign({}, opts), { jobId }));
            res.json({ ok: true });
        }));
    }
    app.use(body_parser_1.default.json());
    // @ts-ignore express types
    app.post("/add-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const existingJob = yield existingTaskQueue.getJob(jobId);
            if (existingJob &&
                !existingJob.isCompleted() &&
                !existingJob.isFailed()) {
                console.log("Job is already in progress");
                return res.status(400).json({ error: "Job is already in progress" });
            }
            const job = yield existingTaskQueue.add(taskName, data, Object.assign(Object.assign({}, opts), { jobId }));
            if (!job) {
                console.log("Failed to create task");
                return res.status(500).json({ error: "Failed to create task" });
            }
            res.json({
                ok: true,
                message: `Task added to ${queueName}`,
                jobId: job.id,
            });
        }
        catch (error) {
            console.log("Error adding task:", error);
            res.status(500).json({ error: error.message });
        }
    }));
    // Schedule garbage collection to run every hour
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        for (const queue in tasksQueues) {
            for (const queueName in tasksQueues[queue]) {
                yield (0, bull_1.cleanOldJobs)(tasksQueues[queue][queueName], constants_1.JOB_RETENTION_HOURS);
            }
        }
    }), constants_1.GARBAGE_COLLECTION_INTERVAL);
    app.listen(process.env.BULL_PORT || 3020, () => {
        console.log(`Running on ${process.env.BULL_PORT}...`);
        constants_1.QUEUES.forEach((queue) => {
            console.log(`For the UI of ${queue}, open http://localhost:${process.env.BULL_PORT}/${queue}`);
        });
        console.log("Make sure Redis is running on port 6379 by default");
        console.log("To populate the queue, run:");
        console.log("To add a task to the queue, send a POST request to /<queue>/add-task with JSON body:");
    });
});
// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
