import { Controller, Get, Post, Body, Patch, Param, MessageEvent, Render, Query, Sse, Res } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Observable, interval, map, timer, concatMap } from 'rxjs';
import { response, Response } from 'express';
import { Application } from './entities/application.entity';
import { RedisClient } from 'src/common/redis-client';


@Controller('applications')
export class ApplicationsController {
  private redisClient: RedisClient;

  constructor(
    private readonly applicationsService: ApplicationsService
    ) {
      this.redisClient = new RedisClient();
    }

  @Get(':type')
  async getTop( 
    @Param('type') type: string,
    @Query('count') count: number
  ) {
    const applicationsTop = await this.applicationsService.getTop(type);
    this.redisClient.setCache(`applications-${type}-top`, JSON.stringify(applicationsTop));

    return { 
      applications: applicationsTop.splice(0, count)
    };
  }


  @Sse(':type/updates-subscribe')
  async updatesSubscribe(
    @Param('type') type: string,
  ) {
    let currentTop = await this.applicationsService.getTop(type);
    return interval(1000 * 60).pipe(
      concatMap(async (_) => {
        let isTopUpdatedStatus = 'Top-10 the most popular iOS appllications has not been changed';
        if (await this.applicationsService.isTopUpdated(type, currentTop)) {
         currentTop = await this.applicationsService.getTop(type);
         isTopUpdatedStatus = 'Top-10 the most popular iOS appllications has been changed';
        }

        return {
          data: {
            message: isTopUpdatedStatus
          }
        }

      }));
  }
}
  