import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityNames } from '../../config/entity-names';

export enum SeedExecutionStatuses {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity(EntityNames.SEED_REVISIONS)
export class SeedRevision {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  revisionId: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: SeedExecutionStatuses,
    default: SeedExecutionStatuses.IN_PROGRESS,
  })
  executionStatus: SeedExecutionStatuses;

  @ApiProperty()
  @Column({ type: 'text', nullable: true, default: null })
  executionErrors: string;
}
