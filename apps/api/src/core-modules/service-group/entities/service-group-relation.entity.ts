import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseIdEntity } from '../../../database/entities/base-id.entity';
import { ServiceGroup } from './service-group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceGroupTypes } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.SERVICE_GROUP_RELATION })
export class ServiceGroupRelation extends BaseIdEntity {
  @JoinColumn({ name: 'service_group' })
  @ManyToOne(
    () => ServiceGroup,
    serviceGroup => serviceGroup.serviceGroupRelations,
    { onDelete: 'CASCADE' },
  )
  serviceGroup: ServiceGroup;

  @ApiProperty()
  @Column({ nullable: true })
  @Index()
  relatedObject: string;

  @ApiProperty()
  @Column({ nullable: true, enum: ServiceGroupTypes })
  @Index()
  relatedType: ServiceGroupTypes;
}
