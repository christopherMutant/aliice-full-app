import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombinedSeedEntities } from './combined-seed-entities';
import { DbSeedersBootstrap } from './db-seeders.bootstrap';
import { SeedRevision } from '../entities/seed-revision.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeedRevision,
      ...CombinedSeedEntities.map(se => se.entity),
    ]),
  ],
  providers: [DbSeedersBootstrap],
})
export class SeederModule {}
