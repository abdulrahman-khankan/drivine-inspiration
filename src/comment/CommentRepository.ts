import { Injectable } from '@nestjs/common';
import { InjectCypher, InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';

import { Comment } from './Comment';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectPersistenceManager() private readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, 'createComment') private readonly createComment: CypherStatement,
    @InjectCypher(__dirname, 'commentsForId') private readonly commentsForId: CypherStatement
  ) {}

  async getById(comment_id: string): Promise<Comment> {
    const spec = new QuerySpecification<Comment>().withStatement(this.commentsForId).bind({ comment_id });
    return this.persistenceManager.getOne(spec);
  }

  /**
   * TODO: integrate this with the auto scrapping
   */
  private async create(comment: Comment): Promise<Comment> {
    const spec = new QuerySpecification<Comment>().withStatement(this.createComment).bind({ ...comment });
    return this.persistenceManager.getOne(spec);
  }
}
