import { HttpService } from '@nestjs/axios';
import { Application } from './entities/application.entity';
export declare class ApplicationsService {
    private httpService;
    constructor(httpService: HttpService);
    getTop(type: string): Promise<Application[]>;
    isTopUpdated(type: string, currentTop?: Application[]): Promise<Boolean>;
}
