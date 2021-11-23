"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const portRedis = process.env.PORT_REDIS || '6379';
const redisClient = redis.createClient(portRedis);
const isCached = (req, res, next) => {
    const { idUser } = req.params;
    redisClient.get(idUser, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        if (data != null) {
            console.log('we Found it in Redis 🟢');
            res.send(data);
        }
        else {
            console.log('User Not Found 🔴 ');
            next();
        }
    });
};
exports.default = isCached;
//# sourceMappingURL=applications-top.middleware.js.map