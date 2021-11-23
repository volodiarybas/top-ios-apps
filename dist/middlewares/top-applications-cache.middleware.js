"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopApplicationsCache = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("../applications/applications.service");
const redis_client_1 = require("../common/redis-client");
let TopApplicationsCache = class TopApplicationsCache {
    constructor() {
        this.redisClient = new redis_client_1.RedisClient();
    }
    async use(req, res, next) {
        const applicationsCount = +req.query.count;
        const applicationsType = req.params.type;
        const applicationsTopCache = await this.redisClient.getCache(`applications-${applicationsType}-top`);
        if (applicationsTopCache) {
            res.end(applicationsTopCache.slice(0, applicationsCount));
        }
        next();
    }
};
TopApplicationsCache = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TopApplicationsCache);
exports.TopApplicationsCache = TopApplicationsCache;
//# sourceMappingURL=top-applications-cache.middleware.js.map