const Redis = require("ioredis");

const connection = {
  port: process.env.REDIS_PORT ?? 6379,
  host: process.env.REDIS_HOST ?? "localhost",
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

module.exports = { connection, checkRedisConnection };
