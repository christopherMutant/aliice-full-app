import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { BaseIdEntity } from './base-id.entity';

@Entity()
export class BaseEntity extends BaseIdEntity {
  @ApiProperty({ required: false, type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ required: false, type: Date })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({ required: false, type: Date })
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
