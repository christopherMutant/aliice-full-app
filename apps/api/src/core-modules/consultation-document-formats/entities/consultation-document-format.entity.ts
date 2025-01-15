import { Entity } from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AbstractConsultationDocumentEntity } from '../../consultation-body-part-entry/entities/abstract-document-consultation-entry.entity';

@Entity({ name: EntityNames.CONSULTATION_DOCUMENT_FORMAT })
export class ConsultationDocumentFormat extends AbstractConsultationDocumentEntity {}
