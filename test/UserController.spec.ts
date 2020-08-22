import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '@/AppModule';
import { configureApp } from '@/main';

describe('UserController (e2e)', () => {
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

  describe('GET /user', () => {
    describe('/:id', () => {
      it('should return the requested user', async () => {
        const userId = '2';

        const result = await requestFromServer(`/user/${userId}`);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/typedef
        const { date_created, date_updated, ...rest } = result.body;
        expect(rest).toEqual(TEST_DATA.users[userId].user);
      });

      it('should return empty list for unknown users', async () => {
        const unknownUserId = '555';

        const result = await requestFromServer(`/user/${unknownUserId}`);

        expect(result.body).toEqual({});
      });

      describe('/:id/comments', () => {
        it('should list available comments of the requested user', async () => {
          const userId = '3';

          const result = await requestFromServer(`/user/${userId}/comments`);
          const comments = result.body.map(removeCreationAndUpdateDates);

          expect(comments).toEqual(jasmine.arrayContaining(TEST_DATA.users[userId].comments));
        });

        it('should return empty list for unknown users', async () => {
          const unknownUserId = '100';

          const result = await requestFromServer(`/user/${unknownUserId}/comments`);

          expect(result.body).toEqual([]);
        });

        it('should return empty list for users without comments', async () => {
          const userIdWithoutComments = '6';

          const result = await requestFromServer(`/user/${userIdWithoutComments}/comments`);

          expect(result.body).toEqual([]);
        });
      });

      describe('/:id/likes', () => {
        it('should list available likes of the requested user', async () => {
          const userId = '3';

          const result = await requestFromServer(`/user/${userId}/likes`);
          const likes = result.body.map(removeCreationAndUpdateDates);

          expect(likes).toEqual(jasmine.arrayContaining(TEST_DATA.users[userId].likes));
        });

        it('should return empty list for unknown users', async () => {
          const unknownUserId = '100';

          const result = await requestFromServer(`/user/${unknownUserId}/likes`);

          expect(result.body).toEqual([]);
        });

        it('should return empty list for users without likes', async () => {
          const userIdWithoutlikes = '6';

          const result = await requestFromServer(`/user/${userIdWithoutlikes}/likes`);

          expect(result.body).toEqual([]);
        });
      });
    });
  });

  const requestFromServer = async (path: string) =>
    request(app.getHttpServer())
      .get(path)
      .expect(HttpStatus.OK);
});

const TEST_DATA = {
  users: {
    '2': {
      user: {
        id: '2',
        username: 'username-2'
      }
    },
    '3': {
      comments: [
        {
          commentId: '10',
          text: 'comment-text-10'
        },
        {
          commentId: '2',
          text: 'comment-text-2'
        },
        {
          commentId: '6',
          text: 'comment-text-6'
        }
      ],
      likes: [
        {
          photoId: '5'
        },
        {
          photoId: '2'
        },
        {
          photoId: '1'
        }
      ]
    }
  }
};

function removeCreationAndUpdateDates(i: any) {
  delete i.date_created;
  delete i.date_updated;
  if (i.likedAt) {
    delete i.likedAt;
  }
  return i;
}
