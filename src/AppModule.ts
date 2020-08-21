import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';

import { QueryModule } from './photo';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    }),
    QueryModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
