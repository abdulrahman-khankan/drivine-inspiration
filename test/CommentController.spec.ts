import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '@/AppModule';
import { configureApp } from '@/main';

describe('CommentController (e2e)', () => {
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

  describe('GET /comment/:id', () => {
    it('should return the requested comment', async () => {
      const commentId = '7';

      const result = await requestFromServer(`/comment/${commentId}`);

      expect(result.body.text).toBe(TEST_DATA[commentId]);
    });

    it('should return empty list for unknown comments', async () => {
      const unknownCommentId = '555';

      const result = await requestFromServer(`/comment/${unknownCommentId}`);

      expect(result.body).toEqual({});
    });
  });

  const requestFromServer = async (path: string) =>
    request(app.getHttpServer())
      .get(path)
      .expect(HttpStatus.OK);
});

const TEST_DATA = {
  '7': 'comment-text-7'
};
