import { Controller, Get, Param, Query, Sse } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { interval, concatMap } from 'rxjs';
import { RedisClient } from '../common/redis-client';


@Controller('applications')
export class ApplicationsController {
  redisClient: RedisClient;

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
        let message = 'Top-10 the most popular iOS appllications has not been changed';
        if (await this.applicationsService.isTopUpdated(type, currentTop)) {
         currentTop = await this.applicationsService.getTop(type);
         message = 'Top-10 the most popular iOS appllications has been changed';
        }

        return {
          data: {
            message: message
          }
        }

      }));
  }
}
  