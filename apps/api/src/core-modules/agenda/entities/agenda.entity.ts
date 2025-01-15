import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AboutAppointment, User } from '../../all-entities';
import { ApiProperty } from '@nestjs/swagger';
import { AgendaTypes } from '../../../shared/types/enums';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';

@Entity({ name: EntityNames.AGENDA })
export class Agenda extends AuditLogsHook {
  @JoinColumn({ name: 'owner' })
  @ManyToOne(() => User, user => user.agendas, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @JoinColumn({ name: 'client' })
  @ManyToOne(() => User, user => user.agendas, {
    onDelete: 'SET NULL',
  })
  client: User;

  @ManyToMany(
    () => AboutAppointment,
    aboutAppointment => aboutAppointment.agendas,
  )
  aboutAppointments: AboutAppointment[];

  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the agenda',
    example: 'Dr. Strange',
  })
  @Column()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Initials of the agenda',
    example: 'SS',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Type of the agenda',
    example: AgendaTypes.USER,
  })
  @Column({
    type: 'enum',
    enum: AgendaTypes,
    default: AgendaTypes.USER,
  })
  status: AgendaTypes;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Color of the agenda',
    example: '#32a852',
  })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Is disabled',
    example: true,
  })
  @Column({ nullable: true })
  disabled: boolean;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Remarks of the agenda',
    example: "Dr. Strange's agenda",
  })
  @Column({ nullable: true })
  remark: string;
}
