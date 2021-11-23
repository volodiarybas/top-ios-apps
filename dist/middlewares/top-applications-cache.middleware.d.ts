import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisClient } from "../common/redis-client";
export declare class TopApplicationsCache implements NestMiddleware {
    redisClient: RedisClient;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
