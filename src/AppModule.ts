import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';

import { PhotoModule } from './photo';
import { CommentModule } from './comment';
import { UserModule } from './user';
import { HashtagModule } from './hashtag';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    }),
    PhotoModule,
    CommentModule,
    UserModule,
    HashtagModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
