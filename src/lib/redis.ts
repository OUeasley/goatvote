import Redis from "ioredis";

export const client = new Redis(`redis://${process.env.UPSTASH_REDIS_REST_USER}:${process.env.UPSTASH_REDIS_REST_TOKEN}@${process.env.UPSTASH_REDIS_REST_URL}:31441`);
