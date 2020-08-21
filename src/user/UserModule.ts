import { Module } from '@nestjs/common';

import { UserController } from './UserController';
import { UserRepository } from './UserRepository';

@Module({
  providers: [UserRepository],
  controllers: [UserController]
})
export class UserModule {}
