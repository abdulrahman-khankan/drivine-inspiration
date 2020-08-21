import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';

import { PhotoModule } from './photo';
import { CommentModule } from './comment';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    }),
    PhotoModule,
    CommentModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
