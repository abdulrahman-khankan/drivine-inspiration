import { Controller, Get, Param } from '@nestjs/common';

import { HashtagRepository } from './HashtagRepository';
import { HashtagPhoto } from './Hashtag';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagRepository: HashtagRepository) {}

  @Get(':id/photos')
  async hashtagById(@Param('id') id: string): Promise<HashtagPhoto[]> {
    return this.hashtagRepository.getPhotosById(id);
  }
}
