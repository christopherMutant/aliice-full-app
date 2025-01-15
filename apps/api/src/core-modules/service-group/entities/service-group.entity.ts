import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceCatalogue } from '../../../shared/types/enums';
import { ServiceGroupRelation } from './service-group-relation.entity';

@Entity({ name: EntityNames.SERVICE_GROUP })
export class ServiceGroup extends AuditLogsHook {
  @OneToMany(
    () => ServiceGroupRelation,
    serviceGroupRelation => serviceGroupRelation.serviceGroup,
    { cascade: true },
  )
  serviceGroupRelations: ServiceGroupRelation[];

  @ApiProperty({
    description: 'Name of the service group',
  })
  @Column({ nullable: true, unique: true })
  @Index()
  code: string;

  @ApiProperty({
    description: 'Description of the service group',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Information of the service group',
  })
  @Column({ nullable: true })
  info: string;

  @ApiProperty({
    description: 'Service catalogue of the service group',
    enum: ServiceCatalogue,
  })
  @Column({ nullable: true, enum: ServiceCatalogue })
  catalogue: ServiceCatalogue;
}
