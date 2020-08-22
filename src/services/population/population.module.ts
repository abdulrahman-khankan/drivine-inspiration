import { Module, Logger } from '@nestjs/common';

import { HashtagModule } from '@/hashtag';
import { PhotoModule } from '@/photo';
import { CommentModule } from '@/comment';
import { UserModule } from '@/user';
import { InstagramModule } from '@/services';
import { PopulationService } from './population.service';


@Module({
  imports: [InstagramModule, HashtagModule, PhotoModule, CommentModule, UserModule],
  providers: [PopulationService, Logger],
  exports: [PopulationService]
})
export class PopulationModule {}
