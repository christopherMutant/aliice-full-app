import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { MedicalNoteAp } from './medical-note-ap.entity';
import { MedicalNoteOf } from './medical-note-of.entity';
import { MedicalNoteNotes } from './medical-note-notes.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalNoteHistory, User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.MEDICAL_NOTE })
export class MedicalNote extends AuditLogsHook {
  @JoinColumn({ name: 'patient' })
  @OneToOne(() => User, user => user.medicalNote, {
    onDelete: 'CASCADE',
  })
  patient: User;

  @OneToOne(
    () => MedicalNoteAp,
    medicalNoteAp => medicalNoteAp.medicalNote,
    { cascade: true },
  )
  ap: MedicalNoteAp;

  @OneToOne(
    () => MedicalNoteOf,
    medicalNoteOf => medicalNoteOf.medicalNote,
    { cascade: true },
  )
  of: MedicalNoteOf;

  @OneToOne(
    () => MedicalNoteNotes,
    medicalNoteNotes => medicalNoteNotes.medicalNote,
    { cascade: true },
  )
  notes: MedicalNoteNotes;

  @OneToMany(
    () => MedicalNoteHistory,
    medicalNoteHistory => medicalNoteHistory.medicalNote,
    { cascade: true },
  )
  histories: MedicalNoteHistory[];

  @ApiProperty({})
  @Column({ default: false })
  automaticallyDisplayWindow: boolean;
}
