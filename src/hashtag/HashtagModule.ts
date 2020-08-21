import { Module } from '@nestjs/common';

import { HashtagController } from './HashtagController';
import { HashtagRepository } from './HashtagRepository';

@Module({
  providers: [HashtagRepository],
  controllers: [HashtagController]
})
export class HashtagModule {}
