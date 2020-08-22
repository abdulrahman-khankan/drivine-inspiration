import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '@/AppModule';
import { configureApp } from '@/main';

describe('HashtagController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /hashtag/:id/photos', () => {
    it('should list the photos for the given hashtag', async () => {
      const testHashtag = 'hashtag-2';

      const result = await requestFromServer(`/hashtag/${testHashtag}/photos`);

      expect(result.body).toEqual(jasmine.arrayContaining(TEST_DATA[testHashtag]));
    });

    it('should return empty list for unknown hashtags', async () => {
      const testHashtag = 'hashtag-255';

      const result = await requestFromServer(`/hashtag/${testHashtag}/photos`);

      expect(result.body).toEqual([]);
    });
  });

  const requestFromServer = async (path: string) =>
    request(app.getHttpServer())
      .get(path)
      .expect(HttpStatus.OK);
});

const TEST_DATA = {
  'hashtag-2': [{ photoId: '10' }, { photoId: '4' }]
};
