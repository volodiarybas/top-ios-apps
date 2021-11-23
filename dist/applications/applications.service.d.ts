import { HttpService } from '@nestjs/axios';
import { Application } from './entities/application.entity';
export declare class ApplicationsService {
    private httpService;
    constructor(httpService: HttpService);
    findAll(): Promise<void>;
    getTop(type: ApplicationTypes, count: number): Promise<Application[]>;
    isTopUpdated(type: ApplicationTypes, currentTop?: Application[]): Promise<Boolean>;
}
