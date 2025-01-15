import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalNote, User } from '../../all-entities';
import { MedicalNoteHistoryRelation } from './medical-note-history-relation.entity';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.MEDICAL_NOTE_HISTORY })
export class MedicalNoteHistory extends AuditLogsHook {
  @OneToOne(
    () => MedicalNoteHistoryRelation,
    medicalNoteHistoryRelation =>
      medicalNoteHistoryRelation.medicalNoteHistory,
  )
  medicalNoteRelation: MedicalNoteHistoryRelation;

  @JoinColumn({ name: 'medical_note' })
  @ManyToOne(
    () => MedicalNote,
    medicalNote => medicalNote.histories,
    { onDelete: 'CASCADE' },
  )
  medicalNote: MedicalNote;

  @JoinColumn({ name: 'modified_from' })
  @ManyToOne(() => User)
  modifiedFrom: User;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  modifiedBy: Date;

  @ApiProperty()
  @Column({ nullable: true, type: 'text' })
  value: string;
}
