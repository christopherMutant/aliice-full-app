import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Canton, Country } from '../../all-entities';

@Entity({ name: EntityNames.CITY })
export class City extends AuditLogsHook {
  @JoinColumn({ name: 'country' })
  @ManyToOne(() => Country, country => country.cities, {
    onDelete: 'SET NULL',
  })
  country: Country;

  @JoinColumn({ name: 'canton' })
  @ManyToOne(() => Canton, canton => canton.cities, {
    onDelete: 'SET NULL',
  })
  canton: Canton;

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
    description: 'zip code of the city',
    example: 'CH',
  })
  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  cantonCode: string;
}
