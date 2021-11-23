import * as redis from 'redis';
export declare class RedisClient {
    portRedis: string;
    client: redis.RedisClient;
    getAsync: any;
    setCache(key: string, value: string): boolean;
    getCache(key: string): Promise<string>;
}
