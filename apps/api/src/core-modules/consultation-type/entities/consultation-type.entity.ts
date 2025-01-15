import { Column, Entity, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTitle } from '../../consultation-title/entities/consultation-title.entity';

@Entity({ name: EntityNames.CONSULTATION_TYPE })
export class ConsultationType extends AuditLogsHook {
  @OneToMany(
    () => ConsultationTitle,
    consultationTitle => consultationTitle.type,
  )
  titles: ConsultationTitle[];

  @ApiProperty({
    description: 'Name of the consultation type',
    example: 'Text',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Url of the icon',
    example: '/icon.svg',
  })
  @Column({ nullable: true })
  icon: string;

  @ApiProperty({
    description:
      'JavaScript object structure of the consultation type',
    example: '{text: string}',
  })
  @Column({ nullable: true, type: 'jsonb' })
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  structure: any;
}
