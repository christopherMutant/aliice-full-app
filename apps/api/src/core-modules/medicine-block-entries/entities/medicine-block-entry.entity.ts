import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';

import { AbstractMedicineConsultationEntry } from '../../consultation-body-part-entry/entities/abstract-medicine-consultation-entry.entity';
import { MedicineBlock } from '../../all-entities';

@Entity({ name: EntityNames.MEDICINE_BLOCK_ENTRY })
export class MedicineBlockEntry extends AbstractMedicineConsultationEntry {
  @JoinColumn({ name: 'medicine_block' })
  @ManyToOne(
    () => MedicineBlock,
    medicineBlock => medicineBlock.entries,
    { onDelete: 'CASCADE' },
  )
  medicineBlock: MedicineBlock;
}
