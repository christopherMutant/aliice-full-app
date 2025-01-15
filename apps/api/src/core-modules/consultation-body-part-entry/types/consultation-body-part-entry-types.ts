import { ApiProperty } from '@nestjs/swagger';
import {
  DataSensitivityTypes,
  MedicineTypes,
  OpenClosedStatus,
  VatTypes,
} from '../../../shared/types/enums';
import { ServiceResponseType } from '../../service/types/service-response.type';

export class ConsultationDocumentEntryType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: OpenClosedStatus;

  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  dataSensitivity: DataSensitivityTypes;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;
}

export class MedicineNameType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class ConsultationMedicineEntryType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: MedicineTypes;

  @ApiProperty()
  product: MedicineNameType;

  @ApiProperty()
  packSize: string;

  @ApiProperty()
  dosage: string;

  @ApiProperty()
  noteForDosage: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  indications: string;

  @ApiProperty()
  medicationPlan: boolean;

  @ApiProperty()
  drivers: string;

  @ApiProperty()
  validFor: number;
}

export class ConsultationInabilityEntryType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  days: number;

  @ApiProperty()
  incapacityForWork: number;

  @ApiProperty()
  ability: number;

  @ApiProperty()
  cause: string;
}

export class ConsultationServiceEntryType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  service: ServiceResponseType;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  nonMandatoryService: boolean;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  tarrifPoint: number;

  @ApiProperty()
  vat: VatTypes;

  @ApiProperty()
  total: number;
}
