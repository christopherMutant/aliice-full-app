import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { City, Country, User } from '../../all-entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: EntityNames.BANKDETAILS })
export class BankDetails extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true })
  bankName: string;

  @ApiProperty()
  @Column({ nullable: true })
  npa: string;

  @ManyToOne(() => City, {
    nullable: true,
  })
  locality: City;

  @ManyToOne(() => Country, {
    nullable: true,
  })
  country: Country;

  @ApiProperty()
  @Column({ nullable: true })
  iban: string;

  //need to encrpyt
  @ApiProperty()
  @Column({ nullable: true })
  accountNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  inFavor: string;

  @JoinColumn()
  @OneToOne(() => User, user => user.bankDetails, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
