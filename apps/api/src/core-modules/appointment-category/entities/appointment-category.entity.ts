import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { AboutAppointment } from '../../all-entities';

@Entity({ name: EntityNames.APPOINTMENT_CATEGORY })
export class AppointmentCategory extends AuditLogsHook {
  @OneToMany(
    () => AboutAppointment,
    aboutAppointment => aboutAppointment.category,
  )
  aboutAppointments: AboutAppointment[];

  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the appointment category',
    example: 'consultation',
  })
  @Column({ nullable: false })
  @Index('appoinment-category-name-idx')
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Color of the appointment category',
    example: '#32a852',
  })
  @Column({ nullable: false })
  color: string;
}
