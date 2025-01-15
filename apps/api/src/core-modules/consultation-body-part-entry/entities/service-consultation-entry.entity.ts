import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceConsultation } from '../../consultation-body/entities/service-consultation-type.entity';
import { VatTypes } from '../../../shared/types/enums';
import { Service } from '../../all-entities';

@Entity({ name: EntityNames.SERVICE_CONSULTATION_ENTRY })
export class ServiceConsultationEntry extends AuditLogsHook {
  @JoinColumn({ name: 'service_consultation' })
  @ManyToOne(
    () => ServiceConsultation,
    serviceConsultation => serviceConsultation.entries,
    { onDelete: 'CASCADE' },
  )
  serviceConsultation: ServiceConsultation;

  @JoinColumn({ name: 'service' })
  @OneToOne(() => Service)
  service: Service;

  @ApiProperty({
    description: 'Remark of the consultation service',
  })
  @Column({ nullable: true })
  remark: string;

  @ApiProperty({
    description: 'If service is mandatory',
  })
  @Column({ nullable: true })
  nonMandatoryService: boolean;

  @ApiProperty({
    description: 'Quantity of the service',
  })
  @Column({ nullable: true })
  quantity: number;

  @ApiProperty({
    description: 'Tarrif point or price of the service',
  })
  @Column({ nullable: true, type: 'numeric' })
  tarrifPoint: number;

  @ApiProperty({
    description: 'Vat type of the service',
  })
  @Column({ nullable: true, enum: VatTypes })
  vat: VatTypes;

  @ApiProperty({
    description: 'Total value of the service',
  })
  @Column({ nullable: true, type: 'numeric' })
  total: number;
}
