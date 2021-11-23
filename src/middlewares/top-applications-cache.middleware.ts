
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisClient } from "../common/redis-client";

@Injectable()
export class TopApplicationsCache implements NestMiddleware {
  redisClient = new RedisClient();

  async use(req: Request, res: Response, next: NextFunction) {
    const applicationsTopCache = await this.redisClient.getCache('applications-top');
    if (applicationsTopCache) {
      res.end(applicationsTopCache);
    } else {
      next();
    }
  }
}
