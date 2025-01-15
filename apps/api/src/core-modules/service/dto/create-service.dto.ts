import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  CompulsoryInsuranceTypes,
  DiscountCategories,
  ServiceCatalogue,
  VatTypes,
} from '../../../shared/types/enums';

export enum ServiceCatalogueForService {
  TARMED = ServiceCatalogue.TARMED,
  ARTICLE = ServiceCatalogue.ARTICLE,
  CUSTOM = ServiceCatalogue.CUSTOM,
}

export class CreateServiceDto {
  @ApiProperty({
    description: 'Code of the service',
    example: '1023',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Reference service of the consultation service',
  })
  @IsOptional()
  @IsBoolean()
  referenceService: boolean;

  @ApiProperty({
    description: 'Description of the service',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Side of the service',
  })
  @IsOptional()
  @IsString()
  side: string;

  @ApiProperty({
    description: 'If service is mandatory',
  })
  @IsOptional()
  @IsBoolean()
  nonMandatoryService: boolean;

  @ApiProperty({
    description: 'Quantity of the service',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Tarrif point or price of the service',
    example: 10.24,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  tarrifPoint: number;

  @ApiProperty({
    description: 'Point value of the service',
    example: 1.2,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  pointValue: number;

  @ApiProperty({
    description: 'Vat of the service',
    enum: VatTypes,
    example: Object.values(VatTypes),
  })
  @IsOptional()
  @IsEnum(VatTypes)
  vat: VatTypes;

  @ApiProperty({
    description: 'Catalogue of the service',
    enum: ServiceCatalogueForService,
    example: Object.values(ServiceCatalogueForService),
  })
  @IsOptional()
  @IsEnum(ServiceCatalogueForService)
  catalogue: ServiceCatalogueForService;

  @ApiProperty({
    description: 'Information of the service',
  })
  @IsOptional()
  @IsString()
  info: string;

  @ApiProperty({
    description: 'Out of business',
  })
  @IsOptional()
  @IsString()
  outOfBusiness: string;

  @ApiProperty({
    description: 'Discount category of the service',
    enum: DiscountCategories,
  })
  @IsOptional()
  @IsEnum(DiscountCategories)
  discountCategory: DiscountCategories;

  @ApiProperty({
    description: 'Type of compulsory insurance of the service',
    enum: CompulsoryInsuranceTypes,
  })
  @IsOptional()
  @IsEnum(CompulsoryInsuranceTypes)
  typeOfCompulsoryInsurance: CompulsoryInsuranceTypes;

  @ApiProperty({
    description: 'pce of the service',
  })
  @IsOptional()
  @IsString()
  pce: string;
}
