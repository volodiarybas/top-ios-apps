import { ApplicationsService } from './applications.service';
import { RedisClient } from '../common/redis-client';
export declare class ApplicationsController {
    private readonly applicationsService;
    redisClient: RedisClient;
    constructor(applicationsService: ApplicationsService);
    getTop(type: string, count: number): Promise<{
        applications: import("./entities/application.entity").Application[];
    }>;
    updatesSubscribe(type: string): Promise<import("rxjs").Observable<{
        data: {
            message: string;
        };
    }>>;
}
