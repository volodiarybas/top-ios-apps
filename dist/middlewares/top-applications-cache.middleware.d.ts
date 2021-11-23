import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class TopApplicationsCache implements NestMiddleware {
    private redisClient;
    constructor();
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
