import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');

import {
  InstagramClient,
  UserProfile,
  Comment,
  Followers,
  Photo,
  mapEdgeNodeToPhoto,
  mapMediaCommentToComment,
  mapMediaLikeToLike,
  Like
} from './instagram.model';

const username = process.env.INSTAGRAM_USERNAME;
const password = process.env.INSTAGRAM_PASSWORD;
const cookieStore = new FileCookieStore('./cookies.json');

@Injectable()
export class InstagramService implements OnModuleInit {
  private readonly client: InstagramClient = new Instagram({ username, password, cookieStore });
  private readonly max_counter = 1000;

  constructor(private readonly logger: Logger) {
    this.logger.setContext('InstagramService');
    this.logger.error('InstagramService initialized');
  }

  /**
   * Get photos for hashtag.
   * @param hashtag The shortcode of the media.
   * @param first A number of records to return max is 49.
   * @param after The query cursor for pagination.
   */
  async getPhotos(hashtag: string, count: number): Promise<Photo[]> {
    if (count > this.max_counter) {
      throw Error(`Unable to request ${count} photos. Max number is ${this.max_counter}.`);
    }

    const photos: Photo[] = [];
    let nextPageCursor = '';

    while (photos.length < count) {
      const remaining: number = count - photos.length;
      const first = remaining > 50 ? 50 : remaining;

      const results = await this.client
        .getPhotosByHashtag({ hashtag, first, after: nextPageCursor })
        .then(raw => raw.hashtag.edge_hashtag_to_media);

      const newPhotos = results.edges.map(mapEdgeNodeToPhoto);

      // Handle weird behaviour where the API returns 3 times the requested number in `first`
      if (newPhotos.length > remaining) {
        photos.push(...newPhotos.slice(0, remaining));
        break;
      } else {
        photos.push(...newPhotos);
        if (results.page_info.has_next_page && results.page_info.end_cursor) {
          nextPageCursor = results.page_info.end_cursor;
        } else {
          break;
        }
      }
    }

    return photos;
  }

  /**
   * Get user by username.
   * @param username The username of the profile.
   */
  async getUser(username: string): Promise<UserProfile> {
    const user = await this.client.getUserByUsername({ username });
    return user;
  }

  /**
   * Get followers for given userId.
   * @param userId The user id
   * @param first Amount of followers to request. Default is 10
   * @param after Optional end_cursor for pagination
   */
  async getFollowers(userId: string, first: number = 10, after: string = ''): Promise<Followers> {
    return this.client.getFollowers({ userId, first, after });
  }

  /**
   * This will return the media likes.
   * @param shortcode The shortcode of the media.
   * @param first A number of records to return max is 49.
   * @param after The query cursor for pagination.
   * TODO: refactor into a reusable `getPaginatedData` function
   */
  async getLikes(shortcode: string, first: number = 10, after: string = ''): Promise<Like[]> {
    const rawLikes = await this.client.getMediaLikes({ shortcode, first, after });
    const likes = rawLikes.edges.map(mapMediaLikeToLike);

    const hasNextPage = rawLikes.page_info.has_next_page;
    const nextPageCursor = rawLikes.page_info.end_cursor;

    // TODO: add max count of comments breaking condition
    if (hasNextPage && nextPageCursor) {
      const newLikesToFetch = Math.min(first, rawLikes.count);
      const newLikes = await this.getLikes(shortcode, newLikesToFetch, nextPageCursor);
      likes.push(...newLikes);
    }

    return likes;
  }

  /**
   * This will return the media comments.
   * @param shortcode The shortcode of the media.
   * @param first A number of records to return max is 49.
   * @param after The query cursor for pagination.
   * TODO: refactor into a reusable `getPaginatedData` function
   */
  async getComments(shortcode: string, first: number = 49, after: string = ''): Promise<Comment[]> {
    const rawComments = await this.client.getMediaComments({ shortcode, first, after });
    const comments = rawComments.edges.map(mapMediaCommentToComment);

    const hasNextPage = rawComments.page_info.has_next_page;
    const nextPageCursor = rawComments.page_info.end_cursor;

    // TODO: add max count of comments breaking condition
    if (hasNextPage && nextPageCursor) {
      const newCommentsToFetch = Math.min(first, rawComments.count);
      const newComments = await this.getComments(shortcode, newCommentsToFetch, nextPageCursor);
      comments.push(...newComments);
    }

    return comments;
  }

  async onModuleInit(): Promise<void> {
    await this.login();
  }

  private async login(): Promise<void> {
    await this.client.login();
  }
}
