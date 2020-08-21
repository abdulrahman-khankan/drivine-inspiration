import { Controller, Get, Param } from '@nestjs/common';

import { PhotoRepository } from './PhotoRepository';
import { Photo } from './Photo';

@Controller('photo')
export class QueryController {
  constructor(private readonly photoRepository: PhotoRepository) {}

  @Get('hashtag/:hashtag/:limit?')
  async byHashtag(@Param('hashtag') hashtag: string, @Param('limit') limit: number = 10): Promise<Photo[]> {
    return this.photoRepository.getByHashtag(hashtag, limit);
  }

  @Get('user/:user_id/:limit?')
  async byUserId(@Param('user_id') user_id: string, @Param('limit') limit: number = 10): Promise<Photo[]> {
    return this.photoRepository.getByUser(user_id, limit);
  }

  @Get('id/:id')
  async byPhotoId(@Param('id') id: string): Promise<Photo> {
    return this.photoRepository.getById(id);
  }
}
