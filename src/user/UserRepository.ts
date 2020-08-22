import { Injectable } from '@nestjs/common';
import { InjectCypher, InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';

import { User, UserLike, UserComment } from './User';

@Injectable()
export class UserRepository {
  constructor(
    @InjectPersistenceManager() private readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, 'createUser') private readonly createUser: CypherStatement,
    @InjectCypher(__dirname, 'usersForId') private readonly usersForId: CypherStatement,
    @InjectCypher(__dirname, 'commentsForUser') private readonly commentsForUser: CypherStatement,
    @InjectCypher(__dirname, 'likesForUser') private readonly likesForUser: CypherStatement,
  ) {}

  async getById(user_id: string): Promise<User | undefined> {
    const spec = new QuerySpecification<User>().withStatement(this.usersForId).bind({ user_id });
    return this.persistenceManager.maybeGetOne(spec);
  }

  async getCommentsById(user_id: string): Promise<UserComment[]> {
    const spec = new QuerySpecification<UserComment>().withStatement(this.commentsForUser).bind({ user_id });
    return this.persistenceManager.query(spec);
  }

  async getLikeById(user_id: string): Promise<UserLike[]> {
    const spec = new QuerySpecification<UserLike>().withStatement(this.likesForUser).bind({ user_id });
    return this.persistenceManager.query(spec);
  }

  /**
   * TODO: integrate this with the auto scrapping
   */
  private async create(user: User): Promise<User> {
    const spec = new QuerySpecification<User>().withStatement(this.createUser).bind({ ...user });
    return this.persistenceManager.getOne(spec);
  }
}
