import { Column, Entity, OneToMany } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { City } from '../../all-entities';

@Entity({ name: EntityNames.COUNTRY })
export class Country extends AuditLogsHook {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the country',
    example: 'Switzerland',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Short name of the country',
    example: 'CH',
  })
  @Column({ nullable: true })
  shortName: string;

  @OneToMany(() => City, city => city.country)
  cities: City[];
}
