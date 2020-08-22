import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';

import { PhotoModule } from './photo';
import { CommentModule } from './comment';
import { UserModule } from './user';
import { HashtagModule } from './hashtag';
import { InstagramModule, PopulationModule } from './services';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    }),
    InstagramModule,
    PhotoModule,
    CommentModule,
    UserModule,
    HashtagModule,
    PopulationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
