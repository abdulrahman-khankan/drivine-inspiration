import { Module } from '@nestjs/common';

import { UserController } from './UserController';
import { UserRepository } from './UserRepository';

@Module({
  providers: [UserRepository],
  controllers: [UserController],
  exports: [UserRepository]
})
export class UserModule {}
