import * as redis from 'redis';
export declare class RedisClient {
    portRedis: string;
    redisClient: redis.RedisClient;
    setCache(key: string, value: string): boolean;
    getCache(key: string): Promise<string>;
}
