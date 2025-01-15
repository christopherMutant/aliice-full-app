import { Column, Entity, OneToMany } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceCategoryRelation } from './service-category-relation.entity';

@Entity({ name: EntityNames.SERVICE_CATEGORY })
export class ServiceCategory extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @OneToMany(
    () => ServiceCategoryRelation,
    serviceCategoryRelation =>
      serviceCategoryRelation.serviceCategory,
    { cascade: true },
  )
  serviceCategoryRelations: ServiceCategoryRelation[];
}
