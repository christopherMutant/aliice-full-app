import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CombinedSeedEntities } from './combined-seed-entities';
import {
  SeedExecutionStatuses,
  SeedRevision,
} from '../entities/seed-revision.entity';

@Injectable()
export class DbSeedersBootstrap implements OnApplicationBootstrap {
  // We need to increment this counter if we have change in seeders that needs to be synced to db
  currentRevision = 3;

  constructor(
    @InjectRepository(SeedRevision)
    private seedRevisionRepository: Repository<SeedRevision>,
    private dataSource: DataSource,
  ) {}

  async acquireSeedRevisionMismatch(): Promise<SeedRevision | null> {
    let response = null;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const revisionExists = await this.dataSource
        .getRepository(SeedRevision)
        .createQueryBuilder('seedRevision')
        .setLock('pessimistic_read')
        .setLock('pessimistic_write')
        .where('seedRevision.revisionId >= :currentRevision', {
          currentRevision: this.currentRevision,
        })
        .useTransaction(true)
        .getOne();

      if (!revisionExists) {
        await this.dataSource
          .createQueryBuilder()
          .setLock('pessimistic_read')
          .setLock('pessimistic_write')
          .insert()
          .into(SeedRevision)
          .values({
            revisionId: this.currentRevision,
          })
          .execute();

        response = await this.seedRevisionRepository.findOneBy({
          revisionId: this.currentRevision,
        });
      }

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      response = null;
    } finally {
      await queryRunner.release();
    }

    return response;
  }

  async syncSeedEntity(
    seedEntity: (typeof CombinedSeedEntities)[number],
  ): Promise<void> {
    const dataRows = seedEntity.getData();

    for (const row of dataRows) {
      const rowItemFound = await this.dataSource
        .getRepository(seedEntity.entity)
        .createQueryBuilder('seedEntity')
        .where(
          `seedEntity.${seedEntity.uniquenessField.toString()} = :identity`,
          {
            identity: row[seedEntity.uniquenessField],
          },
        )
        .getOne();

      const currentEntityRepository = this.dataSource.getRepository(
        seedEntity.entity,
      );

      if (!rowItemFound) {
        await currentEntityRepository.save(row);
      }

      if (rowItemFound) {
        await currentEntityRepository.save({
          ...rowItemFound,
          ...row,
        });
      }
    }
    // @Todo: Might need deletion mechanism as well
  }

  async onApplicationBootstrap(): Promise<void> {
    const seederPromise = this.acquireSeedRevisionMismatch();
    const runSeederRequired = await seederPromise;

    if (runSeederRequired) {
      try {
        for (const seedEntity of CombinedSeedEntities) {
          await this.syncSeedEntity(seedEntity);
        }
        await this.seedRevisionRepository.save({
          id: runSeederRequired.id,
          executionStatus: SeedExecutionStatuses.COMPLETED,
        });
      } catch (e) {
        Logger.error(e);
        await this.seedRevisionRepository.save({
          id: runSeederRequired.id,
          executionStatus: SeedExecutionStatuses.COMPLETED,
          executionErrors: JSON.stringify(e),
        });
      }
    }
  }
}
