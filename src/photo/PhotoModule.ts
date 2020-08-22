import { Module } from '@nestjs/common';

import { PhotoController } from './PhotoController';
import { PhotoRepository } from './PhotoRepository';

@Module({
  providers: [PhotoRepository],
  controllers: [PhotoController],
  exports: [PhotoRepository]
})
export class PhotoModule {}
