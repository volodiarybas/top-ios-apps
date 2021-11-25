import * as redis from 'redis';
import { promisify } from "util";

export class RedisClient {
    portRedis = process.env.PORT_REDIS;
    client = redis.createClient(this.portRedis);
    getAsync = promisify(this.client.get).bind(this.client);

    setCache(key: string, value: string): boolean {
        return this.client.set(key , value);
    }

    async getCache(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            return this.getAsync(key).then(function(res) {
                resolve(res);
            });
        });
    }
}