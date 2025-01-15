import { ApiProperty } from '@nestjs/swagger';
import {
  CompulsoryInsuranceTypes,
  DiscountCategories,
  ServiceCatalogue,
} from '../../../shared/types/enums';

export class ServiceInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Code of the service',
  })
  code: string;

  @ApiProperty({
    description: 'Description of the service',
  })
  description: string;

  @ApiProperty({
    description: 'Is service a mandatory service',
  })
  nonMandatoryService: boolean;

  @ApiProperty({
    description: 'Quantity of the service',
  })
  quantity: number;

  @ApiProperty({
    description: 'Tarrif point or price of the service',
  })
  tarrifPoint: number;

  @ApiProperty({
    description: 'Information of the service',
  })
  info: string;

  @ApiProperty({
    description: 'Service catalogue of the service',
  })
  catalogue: ServiceCatalogue;

  @ApiProperty({
    description: 'Out of business',
  })
  outOfBusiness: string;

  @ApiProperty({
    description: 'Discount category of the service',
  })
  discountCategory: DiscountCategories;

  @ApiProperty({
    description: 'Type of compulsory insurance of the service',
  })
  typeOfCompulsoryInsurance: CompulsoryInsuranceTypes;

  @ApiProperty({
    description: 'pce of the service',
  })
  pce: string;
}
