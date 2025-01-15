// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { EntityNames } from '../../../config/entity-names';
// import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
// import { ApiProperty } from '@nestjs/swagger';
// import { InabilityConsultation } from '../../all-entities';

// @Entity({ name: EntityNames.INABILITY_CONSULTATION_ENTRY })
// export class InabilityConsultationEntry extends AuditLogsHook {
//   @JoinColumn({ name: 'inability_consultation' })
//   @ManyToOne(
//     () => InabilityConsultation,
//     inabilityConsultation => inabilityConsultation.entries,
//     { onDelete: 'CASCADE' },
//   )
//   inabilityConsultation: InabilityConsultation;

//   @ApiProperty({
//     description: 'Date range of the inability',
//   })
//   @Column({ nullable: true })
//   date: string;

//   @ApiProperty({
//     description: 'Number of days of the inability',
//   })
//   @Column({ nullable: true })
//   days: number;

//   @ApiProperty({
//     description: 'Incapacity percentage for work of the patient',
//   })
//   @Column({ nullable: true })
//   incapacityForWork: number;

//   @ApiProperty({
//     description: 'Ability percentage for work of the patient',
//   })
//   @Column({ nullable: true })
//   ability: number;

//   @ApiProperty({
//     description: 'Cause of inability',
//   })
//   @Column({ nullable: true })
//   cause: string;
// }
