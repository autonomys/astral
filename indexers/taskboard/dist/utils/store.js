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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
exports.checkRedisConnection = checkRedisConnection;
const ioredis_1 = __importDefault(require("ioredis"));
const connection = {
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : "localhost",
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        console.log(`Retrying Redis connection in ${delay}ms...`);
        return delay;
    },
};
exports.connection = connection;
function checkRedisConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const redis = new ioredis_1.default(connection);
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
    });
}
