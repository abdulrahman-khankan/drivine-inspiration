import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '@/AppModule';
import { configureApp } from '@/main';

describe('PhotoController (e2e)', () => {
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

  describe('GET /photo', () => {
    describe('/:id', () => {
      it('should return the requested photo', async () => {
        const photoId = '2';

        const result = await requestFromServer(`/photo/${photoId}`);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/typedef
        const { date_created, date_updated, ...rest } = result.body;
        expect(rest).toEqual(TEST_DATA.photos[photoId].photo);
      });

      it('should return empty list for unknown photos', async () => {
        const unknownPhotoId = '555';

        const result = await requestFromServer(`/photo/${unknownPhotoId}`);

        expect(result.body).toEqual({});
      });

      describe('/:id/comments', () => {
        it('should list available comments of the requested photo', async () => {
          const photoId = '7';

          const result = await requestFromServer(`/photo/${photoId}/comments`);

          expect(result.body).toEqual(jasmine.arrayContaining(TEST_DATA.photos[photoId].comments));
        });

        it('should return empty list for unknown photos', async () => {
          const unknownPhotoId = '100';

          const result = await requestFromServer(`/photo/${unknownPhotoId}/comments`);

          expect(result.body).toEqual([]);
        });

        it('should return empty list for photos without comments', async () => {
          const photoIdWithoutComments = '10';

          const result = await requestFromServer(`/photo/${photoIdWithoutComments}/comments`);

          expect(result.body).toEqual([]);
        });
      });

      describe('/:id/likes', () => {
        it('should list available likes of the requested photo', async () => {
          const photoId = '7';

          const result = await requestFromServer(`/photo/${photoId}/likes`);

          expect(result.body).toEqual(jasmine.arrayContaining(TEST_DATA.photos[photoId].likes));
        });

        it('should return empty list for unknown photos', async () => {
          const unknownPhotoId = '100';

          const result = await requestFromServer(`/photo/${unknownPhotoId}/likes`);

          expect(result.body).toEqual([]);
        });

        it('should return empty list for photos without likes', async () => {
          const photoIdWithoutlikes = '6';

          const result = await requestFromServer(`/photo/${photoIdWithoutlikes}/likes`);

          expect(result.body).toEqual([]);
        });
      });
    });

    describe('/hashtag/:hashtag/:limit?', () => {
      it('should list all photos tagged with a hashtag', async () => {
        const hashtagId = 'hashtag-2';

        const result = await requestFromServer(`/photo/hashtag/${hashtagId}`);
        result.body.map(removeCreationAndUpdateDates);

        expect(result.body).toEqual(TEST_DATA.hashtags[hashtagId]);
      });

      it('should list limited number of photos tagged with a hashtag when using limit', async () => {
        const hashtagId = 'hashtag-2';
        const limit = 1;

        const result = await requestFromServer(`/photo/hashtag/${hashtagId}/${limit}`);
        result.body.map(removeCreationAndUpdateDates);

        expect(result.body.length).toBe(limit);
      });

      it('should return empty list for unknown hashtags', async () => {
        const unknownHashtagId = '555';

        const result = await requestFromServer(`/photo/hashtag/${unknownHashtagId}`);

        expect(result.body).toEqual([]);
      });
    });

    describe('/user/:user_id/:limit?', () => {
      it('should list all photos posted by a user', async () => {
        const userId = '5';

        const result = await requestFromServer(`/photo/user/${userId}`);
        result.body.map(removeCreationAndUpdateDates);

        expect(result.body).toEqual(TEST_DATA.users[userId]);
      });

      it('should list limited number of photos posted by a user when using limit', async () => {
        const userId = '5';
        const limit = 1;

        const result = await requestFromServer(`/photo/user/${userId}/${limit}`);
        result.body.map(removeCreationAndUpdateDates);

        expect(result.body.length).toBe(limit);
      });

      it('should return empty list for unknown users', async () => {
        const unknownUserId = '555';

        const result = await requestFromServer(`/photo/user/${unknownUserId}`);

        expect(result.body).toEqual([]);
      });
    });
  });

  const requestFromServer = async (path: string) =>
    request(app.getHttpServer())
      .get(path)
      .expect(HttpStatus.OK);
});

const TEST_DATA = {
  photos: {
    '2': {
      photo: {
        id: '2',
        caption: 'caption-2',
        image_path: 'https://picsum.photos/id/2/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      }
    },
    '7': {
      comments: [
        {
          commentId: '6',
          text: 'comment-text-6'
        },
        {
          commentId: '7',
          text: 'comment-text-7'
        },
        {
          commentId: '8',
          text: 'comment-text-8'
        }
      ],
      likes: [
        {
          userId: '4',
          username: 'username-4'
        }
      ]
    }
  },
  hashtags: {
    'hashtag-2': [
      {
        id: '4',
        caption: 'caption-4',
        image_path: 'https://picsum.photos/id/4/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      },
      {
        id: '10',
        caption: 'caption-10',
        image_path: 'https://picsum.photos/id/10/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      }
    ]
  },
  users: {
    '5': [
      {
        id: '9',
        caption: 'caption-9',
        image_path: 'https://picsum.photos/id/9/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      },
      {
        id: '4',
        caption: 'caption-4',
        image_path: 'https://picsum.photos/id/4/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      },
      {
        id: '2',
        caption: 'caption-2',
        image_path: 'https://picsum.photos/id/2/200/300',
        image_size: 600000,
        location: {
          srid: {
            low: 4326,
            high: 0
          },
          x: 30,
          y: 20
        }
      }
    ]
  }
};

function removeCreationAndUpdateDates(i: any) {
  delete i.date_created;
  delete i.date_updated;
  return i;
}
