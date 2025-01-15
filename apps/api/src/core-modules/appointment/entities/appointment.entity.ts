import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import {
  Department,
  User,
  AppointmentStatus,
  AboutAppointment,
} from '../../all-entities';
import { AppointmentOccurrence } from './appointment_occurrence.entity';

@Entity({ name: EntityNames.APPOINTMENT })
export class Appointment extends AuditLogsHook {
  @JoinColumn({ name: 'patient' })
  @ManyToOne(() => User, user => user.appointments, {
    onDelete: 'SET NULL',
  })
  patient: User;

  @JoinColumn({ name: 'doctor' })
  @ManyToOne(() => User, user => user.appointments, {
    onDelete: 'SET NULL',
  })
  doctor: User;

  @JoinColumn({ name: 'department_id' })
  @ManyToOne(
    () => Department,
    department => department.appointments,
    { onDelete: 'SET NULL' },
  )
  department: Department;

  @JoinColumn({ name: 'status' })
  @ManyToOne(() => AppointmentStatus, status => status.appointments, {
    onDelete: 'SET NULL',
  })
  status: AppointmentStatus;

  @OneToOne(
    () => AboutAppointment,
    aboutAppointment => aboutAppointment.appointment,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  aboutAppointment: AboutAppointment;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Start date and time of the appointment',
    example: '2024-08-27T07:30:00Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  start: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'End date and time of the appointment',
    example: '2024-08-27T07:30:00Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  end: Date;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Description of the appointment',
    example: 'Description of the appointment',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Notes of the appointment',
    example: 'X-ray results are to be analyzed',
  })
  @Column({ nullable: true })
  notes: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'If appointment is recurring/repeating',
    example: false,
  })
  @Column({ nullable: true })
  isRepeating: boolean;

  @ApiProperty({
    required: true,
    type: String,
    description:
      'RRULE details for repeating appointments, value is null if isRepeating is false ',
    example: false,
  })
  @Column({ nullable: true })
  rrule: string;

  @OneToMany(
    () => AppointmentOccurrence,
    appointmentOccurrence => appointmentOccurrence.appointment,
    { cascade: true },
  )
  occurrences: AppointmentOccurrence[];
}
