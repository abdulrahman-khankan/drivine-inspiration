import { Controller, Get, Param } from '@nestjs/common';

import { UserRepository } from './UserRepository';
import { User, UserComment, UserLike } from './User';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get(':id')
  async userById(@Param('id') id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  @Get(':id/comments')
  async photoCommentsByPhotoId(@Param('id') id: string): Promise<UserComment[]> {
    return this.userRepository.getCommentsById(id);
  }

  @Get(':id/likes')
  async photoLikesByPhotoId(@Param('id') id: string): Promise<UserLike[]> {
    return this.userRepository.getLikeById(id);
  }
}
