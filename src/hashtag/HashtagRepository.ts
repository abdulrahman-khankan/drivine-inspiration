import { Injectable } from '@nestjs/common';
import { InjectCypher, InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';

import { Hashtag, HashtagPhoto } from './Hashtag';

@Injectable()
export class HashtagRepository {
  constructor(
    @InjectPersistenceManager() private readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, 'createHashtag') private readonly createHashtag: CypherStatement,
    @InjectCypher(__dirname, 'photosForHashtag') private readonly photosForHashtag: CypherStatement
  ) {}

  async getPhotosById(hashtag_id: string): Promise<HashtagPhoto[]> {
    const spec = new QuerySpecification<HashtagPhoto>().withStatement(this.photosForHashtag).bind({ hashtag_id });
    return this.persistenceManager.query(spec);
  }

  /**
   * TODO: integrate this with the auto scrapping
   */
  private async create(hashtag: Hashtag): Promise<Hashtag> {
    const spec = new QuerySpecification<Hashtag>().withStatement(this.createHashtag).bind({ ...hashtag });
    return this.persistenceManager.getOne(spec);
  }
}
