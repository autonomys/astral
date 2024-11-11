import Redis from "ioredis";

interface RedisConnection {
  port: number;
  host: string;
  retryStrategy: (times: number) => number;
}

export const connection: RedisConnection = {
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  host: process.env.REDIS_HOST ?? "localhost",
  retryStrategy: (times: number): number => {
    const delay = Math.min(times * 50, 2000);
    console.log(`Retrying Redis connection in ${delay}ms...`);
    return delay;
  },
};

export const checkRedisConnection = async (): Promise<void> => {
  const redis = new Redis(connection);
  return new Promise<void>((resolve, reject) => {
    redis.on("ready", () => {
      console.log("Connected to Redis successfully!");
      redis.disconnect();
      resolve();
    });

    redis.on("error", (err: Error) => {
      console.error("Redis connection error:", err);
      redis.disconnect();
      reject(err);
    });
  });
};
