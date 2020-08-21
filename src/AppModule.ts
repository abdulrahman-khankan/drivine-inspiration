import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';

import { PhotoModule } from './photo';
import { CommentModule } from './comment';
import { UserModule } from './user';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    }),
    PhotoModule,
    CommentModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
