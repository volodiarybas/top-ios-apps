import { HttpService, } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RedisClient } from '../common/redis-client';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(private httpService: HttpService) {}
  async findAll() {

  }

  async getTop(type: ApplicationTypes, count: number): Promise<Application[]> {
    const redisClient = new RedisClient();
    const response = await this.httpService.get(`https://rss.applemarketingtools.com/api/v2/us/apps/top-${type}/${count}/apps.json`).toPromise();
    redisClient.setCache('applications-top', JSON.stringify(response.data.feed.results))
    return response.data.feed.results;
  }

  async isTopUpdated(type: ApplicationTypes, currentTop: Application[] = []): Promise<Boolean> {
    const updatedTop = await this.getTop(type, 10);
    const isWithoutUpdates = updatedTop.every((application, index) => application.id === currentTop[index].id);
    return !isWithoutUpdates;
  }
}

