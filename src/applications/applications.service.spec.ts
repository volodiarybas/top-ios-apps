import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { of } from "rxjs";
import { AxiosResponse } from 'axios';
import { Application } from './entities/application.entity';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  const apiResponse = {
    "feed": {
      "title": "Top Free Apps",
      "id": "https://rss.applemarketingtools.com/api/v2/us/apps/top-free/3/apps.json",
      "author": {
        "name": "Apple",
        "url": "https://www.apple.com/"
      },
      "links": [
        {
          "self": "https://rss.applemarketingtools.com/api/v2/us/apps/top-free/3/apps.json"
        }
      ],
      "copyright": "Copyright © 2021 Apple Inc. All rights reserved.",
      "country": "us",
      "icon": "https://www.apple.com/favicon.ico",
      "updated": "Wed, 24 Nov 2021 22:11:48 +0000",
      "results": [ {
        "artistName": "TikTok Pte. Ltd.",
        "id": 11111,
        "name": "TikTok",
        "releaseDate": "2014-04-02",
        "kind": "apps",
        "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/52/8e/ab/528eab10-3184-2e53-493a-a628e8ecab19/AppIcon_TikTok-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
        "genres": [
          {
            "genreId": 1111,
            "name": "Entertainment",
            "url": "https://itunes.apple.com/us/genre/id6016"
          },
          {
            "genreId": 1111,
            "name": "Photo & Video",
            "url": "https://itunes.apple.com/us/genre/id6008"
          }
        ],
        "url": "https://apps.apple.com/us/app/tiktok/id835599320"
      },
      {
        "artistName": "Google LLC",
        "id": 2222,
        "name": "YouTube: Watch, Listen, Stream",
        "releaseDate": "2012-09-11",
        "kind": "apps",
        "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/37/f0/ef/37f0efc3-2117-f866-ca4c-4945fc3db58e/logo_youtube_color-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
        "genres": [
          {
            "genreId": 2222,
            "name": "Photo & Video",
            "url": "https://itunes.apple.com/us/genre/id6008"
          },
          {
            "genreId": 2222,
            "name": "Entertainment",
            "url": "https://itunes.apple.com/us/genre/id6016"
          }
        ],
        "url": "https://apps.apple.com/us/app/youtube-watch-listen-stream/id544007664"
      },
      {
        "artistName": "Instagram, Inc.",
        "id": 3333,
        "name": "Instagram",
        "releaseDate": "2010-10-06",
        "kind": "apps",
        "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/0c/c8/97/0cc897e1-4e6e-7157-71b8-261989ec36a1/Prod-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
        "genres": [
          {
            "genreId": 3333,
            "name": "Photo & Video",
            "url": "https://itunes.apple.com/us/genre/id6008"
          },
          {
            "genreId": 3333,
            "name": "Social Networking",
            "url": "https://itunes.apple.com/us/genre/id6005"
          }
        ],
        "url": "https://apps.apple.com/us/app/instagram/id389801252"
      }]
    }
  }

  const applicationsTop =  [ {
    "artistName": "TikTok Pte. Ltd.",
    "id": 11111,
    "name": "TikTok",
    "releaseDate": "2014-04-02",
    "kind": "apps",
    "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/52/8e/ab/528eab10-3184-2e53-493a-a628e8ecab19/AppIcon_TikTok-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
    "genres": [
      {
        "genreId": 1111,
        "name": "Entertainment",
        "url": "https://itunes.apple.com/us/genre/id6016"
      },
      {
        "genreId": 1111,
        "name": "Photo & Video",
        "url": "https://itunes.apple.com/us/genre/id6008"
      }
    ],
    "url": "https://apps.apple.com/us/app/tiktok/id835599320"
  },
  {
    "artistName": "Google LLC",
    "id": 2222,
    "name": "YouTube: Watch, Listen, Stream",
    "releaseDate": "2012-09-11",
    "kind": "apps",
    "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/37/f0/ef/37f0efc3-2117-f866-ca4c-4945fc3db58e/logo_youtube_color-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
    "genres": [
      {
        "genreId": 2222,
        "name": "Photo & Video",
        "url": "https://itunes.apple.com/us/genre/id6008"
      },
      {
        "genreId": 2222,
        "name": "Entertainment",
        "url": "https://itunes.apple.com/us/genre/id6016"
      }
    ],
    "url": "https://apps.apple.com/us/app/youtube-watch-listen-stream/id544007664"
  },
  {
    "artistName": "Instagram, Inc.",
    "id": 3333,
    "name": "Instagram",
    "releaseDate": "2010-10-06",
    "kind": "apps",
    "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/0c/c8/97/0cc897e1-4e6e-7157-71b8-261989ec36a1/Prod-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.png",
    "genres": [
      {
        "genreId": 3333,
        "name": "Photo & Video",
        "url": "https://itunes.apple.com/us/genre/id6008"
      },
      {
        "genreId": 3333,
        "name": "Social Networking",
        "url": "https://itunes.apple.com/us/genre/id6005"
      }
    ],
    "url": "https://apps.apple.com/us/app/instagram/id389801252"
  }]
  const response: AxiosResponse<any> = {
    data: apiResponse,
    headers: {},
    config: { url: 'http://localhost:3000/mockUrl' },
    status: 200,
    statusText: 'OK',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsService],
      imports: [HttpModule]
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should should return array of them most popular free applications', async () => {
    jest.spyOn(service.httpService, 'get').mockImplementation(() => of(response));

    expect(await service.getTop('free')).toEqual(applicationsTop);

  });

  it('should should return array of them most popular paid applications', async () => {
    jest.spyOn(service.httpService, 'get').mockImplementation(() => of(response));

    expect(await service.getTop('paid')).toEqual(applicationsTop);

  });

  it('should return false when top does not change', async () => {
    service.getTop = jest.fn((type): Promise<Application[]> => Promise.resolve(applicationsTop));
    
    expect(await service.isTopUpdated('free' , applicationsTop)).toEqual(false);

  })

  it('should return true when top changes', async () => {
    service.getTop = jest.fn((type): Promise<Application[]> => Promise.resolve([applicationsTop[0], applicationsTop[2], applicationsTop[1]]));
    
    expect(await service.isTopUpdated('free' , applicationsTop)).toEqual(true);

  })
});
