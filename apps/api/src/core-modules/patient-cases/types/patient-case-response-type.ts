import { ApiProperty } from '@nestjs/swagger';
import { PatientCaseListResponseType } from './patient-case-list-type';
import { DiagnosticResponseType } from '../../diagnostic/types/diagnostic-response-type';
import { InvoiceAttachmentResponseType } from '../../invoice-attachment/types/invoice-attachement-response-type';
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

export class UserNamesType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class CompanyNameType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;
}

export class PatientCaseResponseType extends PatientCaseListResponseType {
  @ApiProperty()
  patient: UserNamesType;

  @ApiProperty()
  referringPhysician: UserNamesType;

  @ApiProperty({ type: [DiagnosticResponseType] })
  diagnostics: DiagnosticResponseType[];

  @ApiProperty({ type: [InvoiceAttachmentResponseType] })
  invoiceAttachments: InvoiceAttachmentResponseType[];

  @ApiProperty()
  status: PatientCaseStatus;

  @ApiProperty()
  caseDifferentiation: CaseDifferentiations;

  @ApiProperty()
  dateOfCase: Date;

  @ApiProperty()
  law: LawCategories;

  @ApiProperty()
  externalCaseNumber: string;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty()
  concerned: string;

  @ApiProperty()
  reasonForProcessing: ReasonsForProcessingCase;

  @ApiProperty()
  placeOfDispensation: PlacesOfDispensation;

  @ApiProperty()
  patientRequriringFurtherCare: boolean;

  @ApiProperty()
  noteForInvoice: string;

  @ApiProperty()
  refundType: RefundTypes;

  @ApiProperty()
  recepient: RecepientTypes;

  @ApiProperty()
  copyToPatients: boolean;

  @ApiProperty()
  splitting: boolean;

  @ApiProperty()
  splittingLaw: LawCategories;

  @ApiProperty()
  splittingRefundType: RefundTypes;

  @ApiProperty()
  splittingRecepient: RecepientTypes;

  @ApiProperty()
  splittingCopyToPatients: boolean;

  @ApiProperty()
  billingVia: boolean;

  @ApiProperty()
  billThrough: CompanyNameType;

  @ApiProperty()
  billingGroup: string;

  @ApiProperty()
  dueDateForBilling: DueDateForBillingTypes;

  @ApiProperty()
  automaticallyCloseCaseAfterBilling: boolean;

  @ApiProperty()
  serviceProvider: ServiceProviders;

  @ApiProperty()
  tarmedPointValueAndPersonalCatalogs: TarmedPointValueAndPersonalCatalogsTypes;

  @ApiProperty()
  source: PatientCaseSource;
}
