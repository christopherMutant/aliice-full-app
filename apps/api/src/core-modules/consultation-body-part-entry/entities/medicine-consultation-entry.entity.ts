import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { MedicineConsultation } from '../../all-entities';
import { AbstractMedicineConsultationEntry } from './abstract-medicine-consultation-entry.entity';

@Entity({ name: EntityNames.MEDICINE_CONSULTATION_ENTRY })
export class MedicineConsultationEntry extends AbstractMedicineConsultationEntry {
  @JoinColumn({ name: 'medicine_consultation' })
  @ManyToOne(
    () => MedicineConsultation,
    medicineConsultation => medicineConsultation.entries,
    { onDelete: 'CASCADE' },
  )
  medicineConsultation: MedicineConsultation;
}
