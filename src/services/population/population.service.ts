import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import { InstagramService, Photo } from '../instagram';
import { HashtagRepository } from '@/hashtag/HashtagRepository';
import { UserRepository } from '@/user/UserRepository';
import { CommentRepository } from '@/comment/CommentRepository';
import { PhotoRepository } from '@/photo/PhotoRepository';

const POPULATE_REAL_DATA = process.env.POPULATE_REAL_DATA === 'TRUE';

interface SearchSpec {
  hashtag: string;
  limit: number;
}

const QUERIES: SearchSpec[] = [
  { hashtag: 'sweden', limit: 40 },
  { hashtag: 'deutschland', limit: 40 },
  { hashtag: 'food', limit: 40 }
];

@Injectable()
export class PopulationService implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly apiClient: InstagramService,
    private readonly hashtagRepository: HashtagRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    private readonly photoRepository: PhotoRepository
  ) {
    this.logger.setContext('PopulationService');
  }

  async onModuleInit(): Promise<void> {
    if (POPULATE_REAL_DATA) {
      this.logger.warn('Data population started.');
      await this.populateData()
      this.logger.warn('Data population completed.');
    }
  }

  async populateData(): Promise<void> {
    for (const { hashtag, limit } of QUERIES) {
      await this.populateHashtag(hashtag);

      const photos = await this.apiClient.getPhotos(hashtag, limit);
      await this.populatePhotos(photos, hashtag);

      const photosWithComments = photos.filter(p => p.commentCount > 0);
      await this.populateComments(photosWithComments);

      const photosWithLikes = photos.filter(p => p.likesCount > 0);
      await this.populateLikes(photosWithLikes);

      // !This must me done last to only add completely new users as we only have the userId available.
      await this.populateUsers(photos);
    }
  }

  private async populateHashtag(hashtag: string): Promise<void> {
    await this.hashtagRepository.create({ id: hashtag });
  }

  private async populatePhotos(photos: Photo[], hashtag: string): Promise<void> {
    for (const photo of photos) {
      await this.photoRepository.createWithHashtag(photo, hashtag);
    }
  }

  /**
   * TODO: refactor with populateLikes to reuse a single method.
   */
  private async populateComments(photos: Photo[]): Promise<void> {
    for (const photo of photos) {
      const shortCode = photo.id;
      const comments = await this.apiClient.getComments(shortCode);

      for (const comment of comments) {
        // eslint-disable-next-line @typescript-eslint/typedef
        const { writtenBy, ...rest } = comment;
        await this.commentRepository.create(rest, writtenBy, shortCode);
      }
    }
  }

  /**
   * TODO: refactor with populateComments to reuse a single method.
   */
  private async populateLikes(photos: Photo[]): Promise<void> {
    for (const photo of photos) {
      const shortCode = photo.id;
      const likes = await this.apiClient.getLikes(shortCode);

      for (const like of likes) {
        await this.userRepository.createLike(like, shortCode);
      }
    }
  }

  /**
   * ! Warning: do this as the final step to only add completely new users as we only have the userId available.
   */
  private async populateUsers(photos: Photo[]): Promise<void> {
    for (const photo of photos) {
      const shortCode = photo.id;
      const userId = photo.ownerId;

      // TODO: add a condition in the createUser query to not update with invalid values.
      await this.userRepository.createPost({ id: userId, isVerified: false, username: '' }, shortCode);
    }
  }
}
