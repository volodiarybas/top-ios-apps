import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { interval, concatMap } from 'rxjs';
import { Application } from './entities/application.entity';

describe('ApplicationsController', () => {
  let applicationsController: ApplicationsController;
  let applicationsService: ApplicationsService;
  let result: Application[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [ApplicationsService],
      imports: [HttpModule]
    }).compile();

    applicationsService = module.get<ApplicationsService>(ApplicationsService);
    applicationsController = module.get<ApplicationsController>(ApplicationsController);
    jest.spyOn(applicationsService, 'getTop').mockImplementation(() => Promise.resolve(result));
    result = [
      {
        id: 111,
        artistName: 'FakeArtistName',
        name: 'FakeName',
        releaseDate: '11.11.11',
        genres:[ {
            genreId: 111,
            name: 'GenreNAme',
        }]
      },
      {
        id: 222,
        artistName: 'FakeArtistName',
        name: 'FakeName',
        releaseDate: '11.11.11',
        genres:[ {
            genreId: 222,
            name: 'GenreNAme',
        }]
      },
      {
        id: 333,
        artistName: 'FakeArtistName',
        name: 'FakeName',
        releaseDate: '11.11.11',
        genres:[ {
            genreId: 333,
            name: 'GenreNAme',
        }]
      },
      {
        id: 444,
        artistName: 'FakeArtistName',
        name: 'FakeName',
        releaseDate: '11.11.11',
        genres:[ {
            genreId: 444,
            name: 'GenreNAme',
        }]
      },
      {
        id: 555,
        artistName: 'FakeArtistName',
        name: 'FakeName',
        releaseDate: '11.11.11',
        genres:[ {
            genreId: 555,
            name: 'GenreNAme',
        }]
      },
    ];
  });
 
  describe('Get Top Application', () => {
    it('should return a top 1 of popular applications depending on query param: count', async () => {
      const expectedResult = [result[0]];

      expect(await applicationsController.getTop('free', 1)).toEqual({"applications": expectedResult });
    });
    it('should return a top 2 of popular applications depending on query param: count', async () => {
      const expectedResult = [result[0], result[1]];

      expect(await applicationsController.getTop('free', 2)).toEqual({"applications": expectedResult} );
    });
    it('should return a top 3 of popular applications depending on query param: count', async () => {
      const expectedResult = [result[0], result[1], result[2]];

      expect(await applicationsController.getTop('free', 3)).toEqual({"applications": expectedResult} );
    });

    it('should cache top 100 of the most popular free applications', async () => {
      const setCacheSpy = jest.spyOn(applicationsController.redisClient, 'setCache');
      const dataToCache = [...result];

      await applicationsController.getTop('free', 5);

      expect(setCacheSpy).toHaveBeenCalled();
      expect(setCacheSpy).toHaveBeenCalledWith('applications-free-top',JSON.stringify(dataToCache));
    });

    it('should cache top 100 of the most popular paid applications', async () => {
      const setCacheSpy = jest.spyOn(applicationsController.redisClient, 'setCache');
      const dataToCache = [...result];

      await applicationsController.getTop('paid', 5);

      expect(setCacheSpy).toHaveBeenCalled();
      expect(setCacheSpy).toHaveBeenCalledWith('applications-paid-top',JSON.stringify(dataToCache));
    });

  });
});
