import { Module } from '@nestjs/common';
import { QueryController } from './QueryController';
import { PhotoRepository } from './PhotoRepository';

@Module({
  providers: [PhotoRepository],
  controllers: [QueryController]
})
export class QueryModule {}
