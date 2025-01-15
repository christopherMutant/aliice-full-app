import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../all-entities';

@Entity({ name: EntityNames.APPOINTMENT_STATUS })
export class AppointmentStatus extends AuditLogsHook {
  @OneToMany(() => Appointment, appointment => appointment.status)
  appointments: Appointment[];

  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the appointment status',
    example: 'Pending',
  })
  @Column({ nullable: false })
  @Index('appoinment-status-name-idx')
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Path to the icon of the appointment status',
    example: '/icons/operation.svg',
  })
  @Column({ nullable: false })
  icon: string;
}
