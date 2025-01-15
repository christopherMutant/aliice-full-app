import { Column, Entity, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { City } from '../../all-entities';

@Entity({ name: EntityNames.CANTON })
export class Canton extends AuditLogsHook {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the canton',
    example: 'Zürich',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Short name of the canton',
    example: 'ZH',
  })
  @Column({ nullable: true })
  shortName: string;

  @OneToMany(() => City, city => city.canton)
  cities: City[];
}
