import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceCatalogue } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';
import { Service } from '../../all-entities';

@Entity({ name: EntityNames.SERVICE_BLOCK })
export class ServiceBlock extends AuditLogsHook {
  @JoinTable({ name: 'service_block_services' })
  @ManyToMany(() => Service, service => service.blocks)
  services: Service[];

  @ApiProperty({
    description: 'Code of the service block',
  })
  @Column({ nullable: true, unique: true })
  @Index()
  code: string;

  @ApiProperty({
    description: 'Description of the service block',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Service catalogue of the service block',
    enum: ServiceCatalogue,
  })
  @Column({
    nullable: true,
    enum: ServiceCatalogue,
    default: ServiceCatalogue.BLOCK,
  })
  catalogue: ServiceCatalogue;

  @ApiProperty({
    description: 'pce of the service block',
  })
  @Column({ nullable: true })
  pce: string;

  @ApiProperty({
    description: 'Information of the service block',
  })
  @Column({ nullable: true })
  info: string;
}
