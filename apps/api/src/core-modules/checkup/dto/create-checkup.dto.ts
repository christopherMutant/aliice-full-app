import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { PatientCase, User } from '../../all-entities';
import {
  CheckUpTypes,
  ServiceStatus,
} from '../../../shared/types/enums';
import { Type } from 'class-transformer';

export class CreateCheckupDto {
  @ApiProperty({
    description: 'Patient Case ID',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsString()
  @IsUUID()
  @IsInDatabase(PatientCase)
  patientCase: string;

  @ApiProperty({
    description: 'Checkup type',
    example: Object.values(CheckUpTypes),
  })
  @IsEnum(CheckUpTypes)
  type: CheckUpTypes;

  @ApiProperty({
    description: 'Checkup status',
    example: Object.values(ServiceStatus),
    default: ServiceStatus.OPEN,
  })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status: ServiceStatus;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Date time of the checkup',
    example: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsLaterThan()
  date: Date;

  @ApiProperty({
    description: 'Subject of the checkup',
    example: 'Knee Pain',
  })
  @IsString()
  @IsOptional()
  subject: string;

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
  doctor: string;
}
