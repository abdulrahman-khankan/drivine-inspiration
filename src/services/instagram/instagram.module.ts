import { Module, Logger } from '@nestjs/common';

import { InstagramService } from './instagram.service';

@Module({
  providers: [InstagramService, Logger],
  exports: [InstagramService]
})
export class InstagramModule {}
