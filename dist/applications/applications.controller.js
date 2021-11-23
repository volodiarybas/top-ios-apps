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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const rxjs_1 = require("rxjs");
const redis_client_1 = require("../common/redis-client");
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
        this.redisClient = new redis_client_1.RedisClient();
    }
    async getTop(type, count) {
        const applicationsTop = await this.applicationsService.getTop(type);
        this.redisClient.setCache(`applications-${type}-top`, JSON.stringify(applicationsTop));
        return {
            applications: applicationsTop.splice(0, count)
        };
    }
    async updatesSubscribe(type) {
        let currentTop = await this.applicationsService.getTop(type);
        return (0, rxjs_1.interval)(1000 * 60).pipe((0, rxjs_1.concatMap)(async (_) => {
            let isTopUpdatedStatus = 'Top-10 the most popular iOS appllications has not been changed';
            if (await this.applicationsService.isTopUpdated(type, currentTop)) {
                currentTop = await this.applicationsService.getTop(type);
                isTopUpdatedStatus = 'Top-10 the most popular iOS appllications has been changed';
            }
            return {
                data: {
                    message: isTopUpdatedStatus
                }
            };
        }));
    }
};
__decorate([
    (0, common_1.Get)(':type'),
    (0, common_1.Render)('TopApplicationsTeamplate'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getTop", null);
__decorate([
    (0, common_1.Sse)(':type/updates-subscribe'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "updatesSubscribe", null);
ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=applications.controller.js.map