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
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    async getTop(type, count) {
        const applications = await this.applicationsService.getTop(type, count);
        return {
            applications: applications
        };
    }
    async updatesSubscribe(type) {
        let currentTop = await this.applicationsService.getTop(type, 10);
        return (0, rxjs_1.interval)(2000).pipe((0, rxjs_1.concatMap)(async (_) => {
            if (await this.applicationsService.isTopUpdated(type, currentTop)) {
                currentTop = await this.applicationsService.getTop(type, 10);
                return {
                    data: {
                        message: 'Top-10 the most popular iOS appllications has been changed'
                    }
                };
            }
            return {
                data: {
                    message: 'Top-10 the most popular iOS appllications has not been changed'
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
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getTop", null);
__decorate([
    (0, common_1.Sse)(':type/updates-subscribe'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "updatesSubscribe", null);
ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=applications.controller.js.map