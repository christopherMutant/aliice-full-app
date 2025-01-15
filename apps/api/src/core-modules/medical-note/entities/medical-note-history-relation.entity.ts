import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalNoteHistory } from './medical-note-history.entity';
import { EntityNames } from '../../../config/entity-names';
import { MedicalNoteTypes } from '../../../shared/types/enums';
import { BaseIdEntity } from '../../../database/entities/base-id.entity';

@Entity({ name: EntityNames.MEDICAL_NOTE_HISTORY_RELATION })
export class MedicalNoteHistoryRelation extends BaseIdEntity {
  @JoinColumn({ name: 'medical_note_history' })
  @OneToOne(
    () => MedicalNoteHistory,
    medicalNoteHistory => medicalNoteHistory.medicalNoteRelation,
    { onDelete: 'CASCADE' },
  )
  medicalNoteHistory: MedicalNoteHistory;

  @ApiProperty()
  @Column({ nullable: true })
  @Index()
  relatedObject: string;

  @ApiProperty()
  @Column({ nullable: true, enum: MedicalNoteTypes })
  @Index()
  relatedType: MedicalNoteTypes;
}
