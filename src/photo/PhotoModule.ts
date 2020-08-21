import { Module } from '@nestjs/common';
import { PhotoController } from './PhotoController';
import { PhotoRepository } from './PhotoRepository';

@Module({
  providers: [PhotoRepository],
  controllers: [PhotoController]
})
export class PhotoModule {}
