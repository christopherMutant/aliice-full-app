import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import {
  Agenda,
  Appointment,
  AppointmentCategory,
} from '../../all-entities';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.ABOUT_APPOINTMENT })
export class AboutAppointment extends AuditLogsHook {
  @JoinColumn({ name: 'appointment' })
  @OneToOne(
    () => Appointment,
    appointment => appointment.aboutAppointment,
    {
      onDelete: 'CASCADE',
    },
  )
  appointment: Appointment;

  @JoinTable({ name: 'agendas_aboutappointments' })
  @ManyToMany(() => Agenda, agenda => agenda.aboutAppointments)
  agendas: Agenda[];

  @JoinColumn({ name: 'category' })
  @ManyToOne(
    () => AppointmentCategory,
    category => category.aboutAppointments,
    { onDelete: 'SET NULL' },
  )
  category: AppointmentCategory;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Title of the appointment',
    example: 'Patient Consultation: John Doe',
  })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'Duration of the appointment in minutes',
    example: '15',
  })
  @Column({ nullable: true })
  duration: number;
}
