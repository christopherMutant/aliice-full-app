import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AdditionalCodesDto } from './additional-codes.dto';

export class CreateDiagnosticDto {
  @ApiProperty({
    description: 'Diagnostic Catalogue ID',
  })
  @IsString()
  @IsUUID()
  catalogue: string;

  @ApiProperty({
    description: 'Diagnostic Catalogue Entry ID',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  catalogueEntry?: string;

  @ApiProperty({
    description: 'Additional codes/attributes of the diagnostic',
    type: AdditionalCodesDto,
    example: {
      right: false,
      left: false,
      acute: false,
      chronic: false,
      infectious: false,
      functional: false,
      neoplasia: false,
      professionalReasons: false,
    },
  })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AdditionalCodesDto)
  additionalCodes: AdditionalCodesDto;

  @ApiProperty({
    description: 'Patient Case ID',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  patientCase: string;

  @ApiProperty({ description: 'Text content of the diagnostic' })
  @IsString()
  @IsOptional()
  text: string;
}
