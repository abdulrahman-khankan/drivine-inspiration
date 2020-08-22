import { Injectable } from '@nestjs/common';
import { InjectCypher, InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';

import { Photo, PhotoComment, PhotoLike } from './Photo';

@Injectable()
export class PhotoRepository {
  constructor(
    @InjectPersistenceManager() private readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, 'createPhoto') private readonly createPhoto: CypherStatement,
    @InjectCypher(__dirname, 'photosForHashtag') private readonly photosForHashtag: CypherStatement,
    @InjectCypher(__dirname, 'photosForUser') private readonly photosForUser: CypherStatement,
    @InjectCypher(__dirname, 'photosForId') private readonly photosForId: CypherStatement,
    @InjectCypher(__dirname, 'commentsForPhoto') private readonly commentsForPhoto: CypherStatement,
    @InjectCypher(__dirname, 'likesForPhoto') private readonly likesForPhoto: CypherStatement
  ) {}

  async getByHashtag(hashtag: string, limit: number): Promise<Photo[]> {
    const spec = new QuerySpecification<Photo>()
      .withStatement(this.photosForHashtag)
      .limit(limit)
      .bind({ hashtagId: hashtag });
    return this.persistenceManager.query(spec);
  }

  async getByUser(user_id: string, limit: number): Promise<Photo[]> {
    const spec = new QuerySpecification<Photo>()
      .withStatement(this.photosForUser)
      .limit(limit)
      .bind({ user_id });
    return this.persistenceManager.query(spec);
  }

  async getById(photo_id: string): Promise<Photo | undefined> {
    const spec = new QuerySpecification<Photo>().withStatement(this.photosForId).bind({ photo_id });
    return this.persistenceManager.maybeGetOne(spec);
  }

  async getCommentsById(photo_id: string): Promise<PhotoComment[]> {
    const spec = new QuerySpecification<PhotoComment>().withStatement(this.commentsForPhoto).bind({ photo_id });
    return this.persistenceManager.query(spec);
  }

  async getLikesById(photo_id: string): Promise<PhotoLike[]> {
    const spec = new QuerySpecification<PhotoLike>().withStatement(this.likesForPhoto).bind({ photo_id });
    return this.persistenceManager.query(spec);
  }

  /**
   * TODO: integrate this with the auto scrapping
   */
  private async create(photo: Photo): Promise<Photo> {
    const spec = new QuerySpecification<Photo>().withStatement(this.createPhoto).bind({ ...photo });
    return this.persistenceManager.getOne(spec);
  }
}
