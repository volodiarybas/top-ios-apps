import { HttpService, } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {

  constructor(private httpService: HttpService) {
  }

  async getTop(type: string): Promise<Application[]> {
    const response = await this.httpService.get(`https://rss.applemarketingtools.com/api/v2/us/apps/top-${type}/100/apps.json`)
      .toPromise()
      .catch(error => {
        throw error
      });

    return response.data.feed.results;
  }

  async isTopUpdated(type: string, currentTop: Application[] = []): Promise<Boolean> {
    const updatedTop = await this.getTop(type);
    const isWithoutUpdates = updatedTop.every((application, index) => application.id === currentTop[index].id);
    return !isWithoutUpdates;
  }
}

