import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment, AppointmentStatus } from '../../all-entities';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.APPOINTMENT_OCCURRENCE })
export class AppointmentOccurrence extends AuditLogsHook {
  @JoinColumn({ name: 'appointment' })
  @ManyToOne(
    () => Appointment,
    appointment => appointment.occurrences,
    { onDelete: 'CASCADE' },
  )
  appointment: Appointment;

  @JoinColumn({ name: 'status' })
  @ManyToOne(() => AppointmentStatus, status => status.appointments, {
    onDelete: 'SET NULL',
  })
  status: AppointmentStatus;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Start date and time of the appointment occurence',
    example: '2024-08-27T07:30:00Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  start: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'End date and time of the appointment occurence',
    example: '2024-08-27T07:30:00Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  end: Date;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'Duration of the appointment occurence in minutes',
    example: '15',
  })
  @Column({ nullable: true })
  duration: number;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Notes of the appointment occurence',
    example: 'X-ray results are to be analyzed',
  })
  @Column({ nullable: true })
  notes: string;
}
