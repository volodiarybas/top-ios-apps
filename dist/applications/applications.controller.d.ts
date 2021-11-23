import { ApplicationsService } from './applications.service';
import { Observable } from 'rxjs';
import { Application } from './entities/application.entity';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    getTop(type: ApplicationTypes, count: number): Promise<{
        applications: Application[];
    }>;
    updatesSubscribe(type: ApplicationTypes): Promise<Observable<{
        data: {
            message: string;
        };
    }>>;
}
