import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseIdEntity } from '../../../database/entities/base-id.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategoryTypes } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';
import { ServiceCategory } from './service-category.entity';

@Entity({ name: EntityNames.SERVICE_CATEGORY_RELATION })
export class ServiceCategoryRelation extends BaseIdEntity {
  @JoinColumn({ name: 'service_category' })
  @ManyToOne(
    () => ServiceCategory,
    serviceCategory => serviceCategory.serviceCategoryRelations,
    { onDelete: 'CASCADE' },
  )
  serviceCategory: ServiceCategory;

  @ApiProperty()
  @Column({ nullable: true })
  @Index()
  relatedObject: string;

  @ApiProperty()
  @Column({ nullable: true, enum: ServiceCategoryTypes })
  @Index()
  relatedType: ServiceCategoryTypes;
}
