import { Module } from '@nestjs/common';

import { HashtagController } from './HashtagController';
import { HashtagRepository } from './HashtagRepository';

@Module({
  providers: [HashtagRepository],
  controllers: [HashtagController],
  exports: [HashtagRepository]
})
export class HashtagModule {}
