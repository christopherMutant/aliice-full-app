import { ApiProperty } from '@nestjs/swagger';
import { PatientCase } from '../../all-entities';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ServiceStatus } from '../../../shared/types/enums';
import { Type } from 'class-transformer';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';

export class CreateProcedureDto {
  @ApiProperty()
  @ApiProperty({
    description: 'Patient Case ID',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsString()
  @IsUUID()
  @IsInDatabase(PatientCase)
  patientCase: string;

  @ApiProperty({
    description: 'Status',
    example: Object.values(ServiceStatus),
    default: ServiceStatus.OPEN,
  })
  @IsEnum(ServiceStatus)
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
}
