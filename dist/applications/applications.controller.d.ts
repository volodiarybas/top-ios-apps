import { ApplicationsService } from './applications.service';
import { Observable } from 'rxjs';
import { Application } from './entities/application.entity';
export declare class ApplicationsController {
    private readonly applicationsService;
    private redisClient;
    constructor(applicationsService: ApplicationsService);
    getTop(type: string, count: number): Promise<{
        applications: Application[];
    }>;
    updatesSubscribe(type: string): Promise<Observable<{
        data: {
            message: string;
        };
    }>>;
}
