import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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
import { Transform } from 'class-transformer';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { Company, User } from '../../all-entities';

export class CreatePatientCaseDto {
  @ApiProperty({
    description: "Patient's User ID",
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsString()
  @IsUUID()
  @IsInDatabase(User)
  patient: string;

  @ApiProperty({
    description: "Doctors's User ID",
    example: '39386107-f89d-4659-8c02-83ac4922d431',
  })
  @IsString()
  @IsUUID()
  @IsInDatabase(User)
  referringPhysician: string;

  @ApiProperty({
    description: 'Concern of the patient',
    example: 'Breast Implants',
  })
  @IsString()
  patientConcern: string;

  @ApiProperty({
    description: 'Patient case status',
    enum: PatientCaseStatus,
    default: PatientCaseStatus.CONSULTATION,
    example: Object.values(PatientCaseStatus),
  })
  @IsEnum(PatientCaseStatus)
  @IsOptional()
  status: PatientCaseStatus;

  @ApiProperty({
    description: 'Case differentiation',
    example: Object.values(CaseDifferentiations),
    enum: CaseDifferentiations,
    default: CaseDifferentiations.NO_SELECTION,
  })
  @IsOptional()
  @IsEnum(CaseDifferentiations)
  caseDifferentiation: CaseDifferentiations;

  @ApiProperty({
    description: 'Date of the case or accident',
    example: new Date(),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  dateOfCase: Date;

  @ApiProperty({
    description: 'Law category of the case',
    example: Object.values(LawCategories),
    enum: LawCategories,
  })
  @IsEnum(LawCategories)
  @IsOptional()
  law: LawCategories;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  // @IsInDatabase(Company)
  billThrough: string;

  @ApiProperty({
    description: 'External case number for this patient case',
  })
  @IsOptional()
  @IsString()
  externalCaseNumber: string;

  @ApiProperty({
    description: 'Closing date of the patient case',
    example: new Date(),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  closingDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  concerned: string;

  @ApiProperty({
    description: 'Reason for processing this patient case',
    type: 'enum',
    example: Object.values(ReasonsForProcessingCase),
    enum: ReasonsForProcessingCase,
  })
  @IsEnum(ReasonsForProcessingCase)
  @IsOptional()
  reasonForProcessing: ReasonsForProcessingCase;

  @ApiProperty({
    description: 'Place of dispensation of this patient case',
    type: 'enum',
    example: Object.values(PlacesOfDispensation),
    enum: PlacesOfDispensation,
  })
  @IsEnum(PlacesOfDispensation)
  @IsOptional()
  placeOfDispensation: PlacesOfDispensation;

  @ApiProperty({
    description: 'Patient requiring further care',
  })
  @IsBoolean()
  @IsOptional()
  patientRequriringFurtherCare: boolean;

  @ApiProperty({
    description: 'Notes for invoice',
  })
  @IsString()
  @IsOptional()
  noteForInvoice: string;

  @ApiProperty({
    description: 'Refund type',
    type: 'enum',
    example: Object.values(RefundTypes),
    enum: RefundTypes,
  })
  @IsEnum(RefundTypes)
  @IsOptional()
  refundType: RefundTypes;

  @ApiProperty({
    description: 'Recepient of billing',
    type: 'enum',
    example: Object.values(RecepientTypes),
    enum: RecepientTypes,
  })
  @IsEnum(RecepientTypes)
  @IsOptional()
  recepient: RecepientTypes;

  @ApiProperty({
    description: 'Send copy to patient',
  })
  @IsBoolean()
  @IsOptional()
  copyToPatients: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  splitting: boolean;

  @ApiProperty({
    description:
      'Law category of the billing method if splitting is true',
    enum: LawCategories,
    example: Object.values(LawCategories),
  })
  @IsEnum(LawCategories)
  @IsOptional()
  splittingLaw: LawCategories;

  @ApiProperty({
    description: 'Refund type if splitting is true',
    type: 'enum',
    enum: RefundTypes,
    example: Object.values(RefundTypes),
  })
  @IsEnum(RefundTypes)
  @IsOptional()
  splittingRefundType: RefundTypes;

  @ApiProperty({
    description: 'Recepient of billing if splitting is true',
    type: 'enum',
    enum: RecepientTypes,
    example: Object.values(RecepientTypes),
  })
  @IsEnum(RecepientTypes)
  @IsOptional()
  splittingRecepient: RecepientTypes;

  @ApiProperty({
    description: 'Send copy to patient if splitting is true',
  })
  @IsOptional()
  @IsBoolean()
  splittingCopyToPatients: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  billingVia: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  billingGroup: string;

  @ApiProperty({
    description: 'Due date for billing',
    enum: DueDateForBillingTypes,
    example: Object.values(DueDateForBillingTypes),
  })
  @IsEnum(DueDateForBillingTypes)
  @IsOptional()
  dueDateForBilling: DueDateForBillingTypes;

  @ApiProperty({
    description: 'Automatically close case after billing',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  automaticallyCloseCaseAfterBilling: boolean;

  @ApiProperty({
    description: 'Service provider',
    enum: ServiceProviders,
    example: Object.values(ServiceProviders),
  })
  @IsEnum(ServiceProviders)
  @IsOptional()
  serviceProvider: ServiceProviders;

  @ApiProperty({
    description: 'Tarmed point value and personal catalogs',
    enum: TarmedPointValueAndPersonalCatalogsTypes,
    example: Object.values(TarmedPointValueAndPersonalCatalogsTypes),
  })
  @IsEnum(TarmedPointValueAndPersonalCatalogsTypes)
  @IsOptional()
  tarmedPointValueAndPersonalCatalogs: TarmedPointValueAndPersonalCatalogsTypes;

  @ApiProperty({
    description: 'Source of the patient case',
    enum: PatientCaseSource,
    default: PatientCaseSource.WALK_IN,
    example: Object.values(PatientCaseSource),
  })
  @IsEnum(PatientCaseSource)
  source: PatientCaseSource;
}
