import { Column, Entity, OneToMany } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { MedicineBlockEntry } from '../../all-entities';

@Entity({ name: EntityNames.MEDICINE_BLOCK })
export class MedicineBlock extends AuditLogsHook {
  @OneToMany(
    () => MedicineBlockEntry,
    medicineBlockEntry => medicineBlockEntry.medicineBlock,
    { cascade: true },
  )
  entries: MedicineBlockEntry[];

  @ApiProperty({ description: 'Name of the medicine block' })
  @Column()
  name: string;
}
