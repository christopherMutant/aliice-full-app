import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import {
  Canton,
  City,
  Company,
  Country,
  User,
} from '../../all-entities';

@Entity({ name: EntityNames.USER_ADDRESS })
export class UserAddress extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true })
  addressSuplement: string;

  @ApiProperty()
  @Column({ nullable: true })
  street: string;

  @ApiProperty()
  @Column({ nullable: true })
  streetNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  postOffice: string;

  @ApiProperty()
  @Column({ nullable: true })
  npa: string;

  @ManyToOne(() => City)
  locality: City;

  @ManyToOne(() => Canton)
  canton: Canton;

  @ApiProperty()
  @Column({ nullable: true })
  region: string;

  @ManyToOne(() => Country)
  country: Country;

  @OneToOne(() => User, user => user.address)
  user: User;

  @OneToOne(() => Company, company => company.address)
  company: Company;
}
