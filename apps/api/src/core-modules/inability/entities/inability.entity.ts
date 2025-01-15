import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Checkup } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: EntityNames.INABILITY })
export class Inability extends AuditLogsHook {
  @JoinColumn({ name: 'checkup' })
  @OneToOne(() => Checkup, checkup => checkup.inability, {
    onDelete: 'CASCADE',
  })
  checkup: Checkup;

  @ApiProperty({
    description: 'Date start of the inability',
  })
  @Column({ nullable: true, type: 'timestamptz' })
  dateStart: Date;

  @ApiProperty({
    description: 'Number of days of the inability',
  })
  @Column({ nullable: true })
  days: number;

  @ApiProperty({
    description: 'Incapacity percentage for work of the patient',
  })
  @Column({ nullable: true })
  incapacityForWork: number;

  @ApiProperty({
    description: 'Ability percentage for work of the patient',
  })
  @Column({ nullable: true })
  ability: number;

  @ApiProperty({
    description: 'Cause of inability',
  })
  @Column({ nullable: true })
  cause: string;
}
