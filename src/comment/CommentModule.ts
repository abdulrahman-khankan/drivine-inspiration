import { Module } from '@nestjs/common';

import { CommentController } from './CommentController';
import { CommentRepository } from './CommentRepository';

@Module({
  providers: [CommentRepository],
  controllers: [CommentController],
  exports: [CommentRepository]
})
export class CommentModule {}
