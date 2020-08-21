import { Controller, Get, Param } from '@nestjs/common';

import { PhotoRepository } from './PhotoRepository';
import { Photo, PhotoLike, PhotoComment } from './Photo';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoRepository: PhotoRepository) {}

  @Get(':id')
  async photoById(@Param('id') id: string): Promise<Photo> {
    return this.photoRepository.getById(id);
  }

  @Get(':id/comments')
  async photoCommentsByPhotoId(@Param('id') id: string): Promise<PhotoComment[]> {
    return this.photoRepository.getCommentsById(id);
  }

  @Get(':id/likes')
  async photoLikesByPhotoId(@Param('id') id: string): Promise<PhotoLike[]> {
    return this.photoRepository.getLikesById(id);
  }

  @Get('hashtag/:hashtag/:limit?')
  async photoByHashtag(@Param('hashtag') hashtag: string, @Param('limit') limit: number = 10): Promise<Photo[]> {
    return this.photoRepository.getByHashtag(hashtag, limit);
  }

  @Get('user/:user_id/:limit?')
  async photoByUserId(@Param('user_id') user_id: string, @Param('limit') limit: number = 10): Promise<Photo[]> {
    return this.photoRepository.getByUser(user_id, limit);
  }
}
