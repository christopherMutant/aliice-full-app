import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import {
  Company,
  Diagnostic,
  Invoice,
  InvoiceAttachment,
  User,
  PatientCaseService,
} from '../../all-entities';
import { ApiProperty } from '@nestjs/swagger';
import {
  CaseDifferentiations,
  DueDateForBillingTypes,
  LawCategories,
  PatientCaseSource,
  PatientCaseStatus,
  PlacesOfDispensation,
  ReasonsForProcessingCase,
  RecepientTypes,
  RefundTypes,
  ServiceProviders,
  TarmedPointValueAndPersonalCatalogsTypes,
} from '../../../shared/types/enums';

@Entity({ name: EntityNames.PATIENT_CASE })
export class PatientCase extends AuditLogsHook {
  @ApiProperty()
  @Generated('increment')
  @Column({ unique: true })
  caseNo: number;

  @JoinColumn({ name: 'patient' })
  @ManyToOne(() => User, user => user.patientCases, {
    onDelete: 'SET NULL',
  })
  patient: User;

  @JoinColumn({ name: 'referring_physician' })
  @ManyToOne(() => User, user => user.patientCases, {
    onDelete: 'SET NULL',
  })
  referringPhysician: User;

  @ApiProperty()
  @Column({ nullable: true })
  patientConcern: string;

  @OneToMany(() => Diagnostic, diagnostic => diagnostic.patientCase)
  diagnostics: Diagnostic[];

  @JoinColumn({ name: 'bill_through' })
  @ManyToOne(() => Company, { onDelete: 'SET NULL' })
  billThrough: Company;

  @OneToMany(
    () => InvoiceAttachment,
    invoiceAttachment => invoiceAttachment.patientCase,
    { cascade: true },
  )
  invoiceAttachments: InvoiceAttachment[];

  @ApiProperty({
    description: 'Patient case status',
    enum: PatientCaseStatus,
    default: PatientCaseStatus.CONSULTATION,
  })
  @Column({ nullable: true })
  status: PatientCaseStatus;

  @ApiProperty({
    description: 'Case differentiation',
    enum: CaseDifferentiations,
    default: CaseDifferentiations.NO_SELECTION,
  })
  @Column({ nullable: true })
  caseDifferentiation: CaseDifferentiations;

  @ApiProperty({
    description: 'Date of the case or accident',
    example: new Date(),
  })
  @Column({ type: 'timestamptz', nullable: true })
  dateOfCase: Date;

  @ApiProperty({
    description: 'Law category of the patient case',
    example: LawCategories.LAMAL,
    type: 'enum',
    enum: LawCategories,
  })
  @Column({
    enum: LawCategories,
    nullable: true,
  })
  law: LawCategories;

  @ApiProperty({
    description: 'External case number for this patient case',
  })
  @Column({ nullable: true })
  externalCaseNumber: string;

  @ApiProperty({
    description: 'Closing date of the patient case',
    example: new Date(),
  })
  @Column({ type: 'timestamptz', nullable: true })
  closingDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  concerned: string;

  @ApiProperty({
    description: 'Reason for processing this patient case',
    type: 'enum',
    enum: ReasonsForProcessingCase,
  })
  @Column({ nullable: true })
  reasonForProcessing: ReasonsForProcessingCase;

  @ApiProperty({
    description: 'Place of dispensation of this patient case',
    type: 'enum',
    enum: PlacesOfDispensation,
  })
  @Column({ nullable: true, enum: PlacesOfDispensation })
  placeOfDispensation: PlacesOfDispensation;

  @ApiProperty({
    description: 'Patient requiring further care',
  })
  @Column({ nullable: true, default: false })
  patientRequriringFurtherCare: boolean;

  @ApiProperty({
    description: 'Notes for invoice',
  })
  @Column({ nullable: true })
  noteForInvoice: string;

  @ApiProperty({
    description: 'Refund type',
    type: 'enum',
    enum: RefundTypes,
  })
  @Column({ nullable: true, enum: RefundTypes })
  refundType: RefundTypes;

  @ApiProperty({
    description: 'Recepient of billing',
    type: 'enum',
    enum: RecepientTypes,
  })
  @Column({ nullable: true, enum: RecepientTypes })
  recepient: RecepientTypes;

  @ApiProperty({
    description: 'Send copy to patient',
  })
  @Column({ nullable: true, default: false })
  copyToPatients: boolean;

  @ApiProperty()
  @Column({ nullable: true, default: false })
  splitting: boolean;

  @ApiProperty({
    description:
      'Law category of the billing method if splitting is true',
    example: LawCategories.LAMAL,
  })
  @Column({
    type: 'enum',
    enum: LawCategories,
    nullable: true,
  })
  splittingLaw: LawCategories;

  @ApiProperty({
    description: 'Refund type if splitting is true',
    type: 'enum',
    enum: RefundTypes,
  })
  @Column({ nullable: true, enum: RefundTypes })
  splittingRefundType: RefundTypes;

  @ApiProperty({
    description: 'Recepient of billing if splitting is true',
    type: 'enum',
    enum: RecepientTypes,
  })
  @Column({ nullable: true, enum: RecepientTypes })
  splittingRecepient: RecepientTypes;

  @ApiProperty({
    description: 'Send copy to patient if splitting is true',
  })
  @Column({ nullable: true, default: false })
  splittingCopyToPatients: boolean;

  @ApiProperty()
  @Column({ nullable: true, default: false })
  billingVia: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  billingGroup: string;

  @ApiProperty({
    description: 'Due date for billing',
    enum: DueDateForBillingTypes,
  })
  @Column({ nullable: true, enum: DueDateForBillingTypes })
  dueDateForBilling: DueDateForBillingTypes;

  @ApiProperty({
    description: 'Automatically close case after billing',
    default: false,
  })
  @Column({ nullable: true, default: false })
  automaticallyCloseCaseAfterBilling: boolean;

  @ApiProperty({
    description: 'Service provider',
    enum: ServiceProviders,
  })
  @Column({ nullable: true, enum: ServiceProviders })
  serviceProvider: ServiceProviders;

  @ApiProperty({
    description: 'Tarmed point value and personal catalogs',
    enum: TarmedPointValueAndPersonalCatalogsTypes,
  })
  @Column({
    nullable: true,
    enum: TarmedPointValueAndPersonalCatalogsTypes,
  })
  tarmedPointValueAndPersonalCatalogs: TarmedPointValueAndPersonalCatalogsTypes;

  @OneToMany(() => Invoice, invoice => invoice.case)
  invoices: Invoice[];

  @ApiProperty({
    description: 'Source of the patient case',
    enum: PatientCaseSource,
  })
  @Column({
    nullable: true,
    enum: PatientCaseSource,
  })
  source: PatientCaseSource;

  @OneToMany(
    () => PatientCaseService,
    patientCaseService => patientCaseService.patientCase,
    { cascade: true },
  )
  services: PatientCaseService[];
}
