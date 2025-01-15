import { Column, Entity } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ENV } from '../config/env';
import { BaseEntity } from '../database/entities/base.entity';

@Entity()
export class AuditLogsHook extends BaseEntity {
  @ApiProperty({ required: false, type: String })
  @Column({
    name: 'created_by',
    type: 'uuid',
    default: () => `'${ENV.SYSTEM_USER_ID}'`,
  })
  createdBy: string;

  @ApiProperty({ required: false, type: String })
  @Column({
    name: 'updated_by',
    type: 'uuid',
    default: () => `'${ENV.SYSTEM_USER_ID}'`,
  })
  updatedBy: string;

  @ApiProperty({ required: false, type: String })
  @Column({ name: 'deleted_by', type: 'uuid', default: null })
  deletedBy: string;
}
