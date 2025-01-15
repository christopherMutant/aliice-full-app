import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalNote } from './medical-note.entity';
import { EntityNames } from '../../../config/entity-names';

@Entity({ name: EntityNames.MEDICAL_NOTE_OF })
export class MedicalNoteOf extends AuditLogsHook {
  @ApiProperty()
  @Column({ nullable: true, type: 'text' })
  value: string;

  @JoinColumn({ name: 'medical_note' })
  @OneToOne(() => MedicalNote, medicalNote => medicalNote.of, {
    onDelete: 'CASCADE',
  })
  medicalNote: MedicalNote;
}