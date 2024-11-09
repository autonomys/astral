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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueueMQ = void 0;
exports.cleanOldJobs = cleanOldJobs;
exports.setupBullMQProcessor = setupBullMQProcessor;
const bullmq_1 = require("bullmq");
const store_1 = require("./store");
const createQueueMQ = (name) => new bullmq_1.Queue(name, { connection: store_1.connection });
exports.createQueueMQ = createQueueMQ;
function setupBullMQProcessor(queueName, task) {
    return __awaiter(this, void 0, void 0, function* () {
        new bullmq_1.Worker(queueName, task.handler, {
            connection: store_1.connection,
            concurrency: task.concurrency,
        })
            .on("completed", (job) => {
            console.log(`Job ${job.id} has been completed`);
        })
            .on("failed", (job, err) => {
            console.error(`Job ${job.id} has failed with error ${err.message}`);
        });
    });
}
function cleanOldJobs(queue, hours) {
    return __awaiter(this, void 0, void 0, function* () {
        const threshold = Date.now() - hours * 60 * 60 * 1000;
        const jobs = yield queue.getJobs(["completed", "failed"]);
        for (const job of jobs) {
            if (job.finishedOn && job.finishedOn < threshold) {
                yield job.remove();
                console.log(`Removed job ${job.id} from queue ${queue.name}`);
            }
        }
    });
}
