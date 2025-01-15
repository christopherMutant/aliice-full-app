import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { User } from '../../all-entities';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity({ name: EntityNames.DEPARTMENTS })
export class Department extends AuditLogsHook {
  @ApiProperty({
    description: 'Name of the Department',
    example: 'Surgery',
  })
  @Column({ unique: true, nullable: false })
  @Index('department-name-idx')
  name: string;

  @ApiProperty({
    description: 'Description of the Department',
    example:
      'Surgical unit or facility is a place where surgeries are performed. It may also be a place where patients are cared for and treated before or after the surgery.',
  })
  @Column()
  description: string;

  @OneToMany(() => User, user => user.department)
  users: User[];

  @OneToMany(() => Appointment, appointment => appointment.department)
  appointments: Appointment[];
}
