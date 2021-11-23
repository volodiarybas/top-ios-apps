import { Controller, Get, Post, Body, Patch, Param, MessageEvent, Render, Query, Sse, Res } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Observable, interval, map, timer, concatMap } from 'rxjs';
import { Response } from 'express';
import { Application } from './entities/application.entity';


@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get(':type')
  @Render('TopApplicationsTeamplate')
  async getTop( 
    @Param('type') type: ApplicationTypes,
    @Query('count') count: number
  ) {
    const applications = await this.applicationsService.getTop(type, count);
    return {
      applications: applications
    }
    
  }


  @Sse(':type/updates-subscribe')
  async updatesSubscribe(
    @Param('type') type: ApplicationTypes,
  ) {
    let currentTop = await this.applicationsService.getTop(type, 10);
    return interval(2000).pipe(
      concatMap(async (_) => {
        if (await this.applicationsService.isTopUpdated(type, currentTop)) {
         currentTop = await this.applicationsService.getTop(type, 10);
         return {
           data: {
             message: 'Top-10 the most popular iOS appllications has been changed'
           }
         }
        }
        return {
          data: {
            message: 'Top-10 the most popular iOS appllications has not been changed'
          }
        }
      }),
    );
  }
}
  