import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '../../all-entities';
import { MedicineTypes } from '../../../shared/types/enums';

@Entity()
export abstract class AbstractMedicineConsultationEntry extends AuditLogsHook {
  @ApiProperty({
    description: 'Type of the product or medicine',
    enum: Object.values(MedicineTypes),
  })
  @Column({ nullable: true, enum: MedicineTypes })
  type: MedicineTypes;

  @JoinColumn({ name: 'product' })
  @ManyToOne(() => Medicine)
  product: Medicine;

  @ApiProperty({
    description: 'Pack size of the product or medicine',
  })
  @Column({ nullable: true })
  packSize: string;

  @ApiProperty({
    description: 'Dosage of the product or medicine',
  })
  @Column({ nullable: true })
  dosage: string;

  @ApiProperty({
    description: 'Note for dosage of the product or medicine',
  })
  @Column({ nullable: true })
  noteForDosage: string;

  @ApiProperty({
    description: 'Duration of use of the product or medicine',
  })
  @Column({ nullable: true })
  duration: string;

  @ApiProperty({
    description: 'Quantity of the product or medicine',
  })
  @Column({ nullable: true })
  quantity: number;

  @ApiProperty({
    description: 'Indications of the product or medicine',
  })
  @Column({ nullable: true })
  indications: string;

  @ApiProperty({
    description:
      'If a medication plan is created for the product or medicine',
  })
  @Column({ nullable: true })
  medicationPlan: boolean;

  @ApiProperty({
    description: 'Drivers of the product or medicine',
  })
  @Column({ nullable: true })
  drivers: string;

  @ApiProperty({
    description:
      'Validity of this consultation/prescription in months',
  })
  @Column({ nullable: true })
  validFor: number;
}
