"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const redis = require("redis");
class RedisClient {
    constructor() {
        this.portRedis = process.env.PORT_REDIS || '6379';
        this.redisClient = redis.createClient(this.portRedis);
    }
    setCache(key, value) {
        return this.redisClient.set(key, value);
    }
    async getCache(key) {
        let cachedData;
        await this.redisClient.get(key, function (error, data) {
            if (error)
                throw error;
            if (data) {
                cachedData = data;
            }
        });
        console.log({ cachedData });
        return cachedData;
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis-client.js.map