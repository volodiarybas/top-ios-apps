
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisClient } from "../common/redis-client";

@Injectable()
export class TopApplicationsCache implements NestMiddleware {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const applicationsCount = +req.query.count;
    const applicationsType = req.params.type;

    const applicationsTopCache = await this.redisClient.getCache(`applications-${applicationsType}-top`);

    if (applicationsTopCache) {
      res.end(applicationsTopCache.slice(0, applicationsCount));
    }
    next();
  }
}
