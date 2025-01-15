import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinDate,
} from 'class-validator';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';
import {
  AssuranceType,
  HealthInsuranceModel,
} from '../../../shared/types/enums';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { Company, Insurance } from '../../all-entities';

export class CreateInsuranceDto {
  @ApiProperty({
    description: 'Insurance ID for updating the insurance',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  @IsInDatabase(Insurance)
  insuranceId: string; // id field when updating the insurance from the user entity

  @ApiProperty({
    description: 'Type of Insurance for the user',
    enum: AssuranceType,
    example: Object.values(AssuranceType),
    required: true,
  })
  @IsEnum(AssuranceType, { message: 'Invalid Assurance' })
  assuranceType: AssuranceType;

  @ApiProperty({
    required: true,
    description: 'Company ID',
  })
  @IsUUID()
  @IsInDatabase(Company)
  company: string;

  @ApiProperty({
    description: 'Health insurance model of the user',
    enum: HealthInsuranceModel,
    example: Object.values(HealthInsuranceModel),
    required: true,
  })
  @IsEnum(HealthInsuranceModel, {
    message: 'Invalid HealthInsurance value',
  })
  healthInsuranceModel: HealthInsuranceModel;

  @ApiProperty({
    description: 'Card number of the user',
  })
  @IsString()
  @IsOptional()
  cardNumber: string;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Start date of the insurance ',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date(), {
    message: `Insurance state datetime should be greater ${new Date().toISOString()}`,
  })
  validFrom: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'End date of the insurance ',
  })
  @IsString()
  @IsLaterThan('insuranceStart', {
    message:
      'Insurance end date should be later than the insurance start datetime ',
  })
  validTo: Date;

  @ApiProperty({
    description: 'Insurance number of the user',
  })
  @IsNotEmpty()
  @IsString()
  insuranceNumber: string;

  @ApiProperty({
    description: 'Checks if a copy will be sent to reference',
    example: true,
  })
  @IsBoolean()
  sendCopyToRefence: boolean;

  @ApiProperty()
  @IsString()
  noticed: string;
}
