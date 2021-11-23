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
exports.ApplicationsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const redis_client_1 = require("../common/redis-client");
let ApplicationsService = class ApplicationsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findAll() {
    }
    async getTop(type, count) {
        const redisClient = new redis_client_1.RedisClient();
        const response = await this.httpService.get(`https://rss.applemarketingtools.com/api/v2/us/apps/top-${type}/${count}/apps.json`).toPromise();
        redisClient.setCache('applications-top', JSON.stringify(response.data.feed.results));
        return response.data.feed.results;
    }
    async isTopUpdated(type, currentTop = []) {
        const updatedTop = await this.getTop(type, 10);
        const isWithoutUpdates = updatedTop.every((application, index) => application.id === currentTop[index].id);
        return !isWithoutUpdates;
    }
};
ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApplicationsService);
exports.ApplicationsService = ApplicationsService;
//# sourceMappingURL=applications.service.js.map