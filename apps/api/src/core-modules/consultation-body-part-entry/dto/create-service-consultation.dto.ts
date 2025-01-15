import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { VatTypes } from '../../../shared/types/enums';

export class CreateServiceConsultationEntryDto {
  @ApiProperty({
    description: 'UUID of the service',
  })
  @IsUUID()
  service: string;

  @ApiProperty({
    description: 'Remark of the consultation service',
  })
  @IsOptional()
  @IsString()
  remark: string;

  @ApiProperty({
    description: 'If service is mandatory',
  })
  @IsOptional()
  @IsBoolean()
  nonMandatoryService: boolean;

  @ApiProperty({
    description: 'Quantity of the service',
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Tarrif point or price of the service',
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  tarrifPoint: number;

  @ApiProperty({
    description: 'Vat of the service',
    enum: VatTypes,
  })
  @IsOptional()
  @IsEnum(VatTypes)
  vat: VatTypes;
}
