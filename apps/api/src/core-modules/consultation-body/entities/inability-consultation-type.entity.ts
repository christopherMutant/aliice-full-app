// import {
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   OneToOne,
// } from 'typeorm';
// import { EntityNames } from '../../../config/entity-names';
// import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
// import { ConsultationTitle } from '../../consultation-title/entities/consultation-title.entity';
// import { ConsultationBody } from '../../all-entities';
// import { InabilityConsultationEntry } from '../../consultation-body-part-entry/entities/inability-consultation-entry.entity';

// @Entity({ name: EntityNames.INABILITY_CONSULTATION })
// export class InabilityConsultation extends AuditLogsHook {
//   @JoinColumn({ name: 'title' })
//   @ManyToOne(
//     () => ConsultationTitle,
//     consultationTitle => consultationTitle.medicineConsultations,
//     { onDelete: 'SET NULL' },
//   )
//   title: ConsultationTitle;

//   @OneToOne(
//     () => ConsultationBody,
//     consultationBody => consultationBody.relatedObject,
//     { onDelete: 'CASCADE', cascade: true },
//   )
//   @JoinColumn({ name: 'consultation_body' })
//   consultationBody: ConsultationBody;

//   @OneToMany(
//     () => InabilityConsultationEntry,
//     inabilityConsultationEntry =>
//       inabilityConsultationEntry.inabilityConsultation,
//     { cascade: true },
//   )
//   entries: InabilityConsultationEntry[];
// }
