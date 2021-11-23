"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const redis = require("redis");
const { promisify } = require("util");
class RedisClient {
    constructor() {
        this.portRedis = process.env.PORT_REDIS || '6379';
        this.client = redis.createClient(this.portRedis);
        this.getAsync = promisify(this.client.get).bind(this.client);
    }
    setCache(key, value) {
        return this.client.set(key, value);
    }
    async getCache(key) {
        return new Promise((resolve, reject) => {
            return this.getAsync(key).then(function (res) {
                if (res == null) {
                    reject("fail promise");
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=redis-client.js.map