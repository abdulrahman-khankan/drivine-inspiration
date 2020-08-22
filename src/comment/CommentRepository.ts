import { Injectable } from '@nestjs/common';
import { InjectCypher, InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';

import { Comment } from './Comment';
import { User } from '@/user/User';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectPersistenceManager() private readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, 'createComment') private readonly createComment: CypherStatement,
    @InjectCypher(__dirname, 'commentsForId') private readonly commentsForId: CypherStatement
  ) {}

  async getById(comment_id: string): Promise<Comment | undefined> {
    const spec = new QuerySpecification<Comment>().withStatement(this.commentsForId).bind({ comment_id });
    return this.persistenceManager.maybeGetOne(spec);
  }

  async create(comment: Comment, user: User, photoId: string): Promise<Comment> {
    const spec = new QuerySpecification<Comment>().withStatement(this.createComment).bind({ comment, user, photoId });
    return this.persistenceManager.getOne(spec);
  }
}
