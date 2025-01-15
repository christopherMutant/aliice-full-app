import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';

import { ApiProperty } from '@nestjs/swagger';
import { DocumentConsultation } from '../../all-entities';
import { OpenClosedStatus } from '../../../shared/types/enums';
import { AbstractConsultationDocumentEntity } from './abstract-document-consultation-entry.entity';

@Entity({ name: EntityNames.DOCUMENT_CONSULTATION_ENTRY })
export class DocumentConsultationEntry extends AbstractConsultationDocumentEntity {
  @JoinColumn({ name: 'document_consultation' })
  @ManyToOne(
    () => DocumentConsultation,
    documentConsultation => documentConsultation.entries,
    { onDelete: 'CASCADE' },
  )
  documentConsultation: DocumentConsultation;

  @ApiProperty({
    description: 'Status of the document',
    enum: Object.values(OpenClosedStatus),
  })
  @Column({ nullable: true, enum: OpenClosedStatus })
  status: OpenClosedStatus;

  @ApiProperty({
    description:
      'Creation date of the original consultation document',
  })
  @Column({ nullable: true, type: 'timestamptz' })
  date: Date;
}
