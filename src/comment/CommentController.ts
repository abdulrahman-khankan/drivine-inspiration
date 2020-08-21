import { Controller, Get, Param } from '@nestjs/common';

import { CommentRepository } from './CommentRepository';
import { Comment } from './Comment';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentRepository: CommentRepository) {}

  @Get(':id')
  async commentById(@Param('id') id: string): Promise<Comment> {
    return this.commentRepository.getById(id);
  }
}
