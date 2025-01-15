import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinDate,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { AppointmentIntervalUnits } from '../../../shared/types/enums';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: "Patient's User ID",
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  patient: string;

  @ApiProperty({
    description: "Doctors's User ID",
    example: '39386107-f89d-4659-8c02-83ac4922d431',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  doctor: string;

  @ApiProperty({
    description: 'Array of Agenda IDs related for this appointment',
    example: '["25135517-65e8-4742-ae12-72761b77655c"]',
  })
  @IsNotEmpty()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsUUID('all', { each: true })
  @IsArray()
  agendas: string[];

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Start date and time of the appointment',
    example: '2024-08-27T07:30:00Z',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date(), {
    message: `Appointment start datetime should be greater than ${new Date().toISOString()}`,
  })
  start: Date;

  @ApiProperty({
    type: String,
    description: 'Description of the appointment',
    example: 'Description of the appointment',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Appointment Status ID',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  status: string;

  @ApiProperty({
    description: 'Appointment Category ID',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  category: string;

  @ApiProperty({
    type: Number,
    description: 'Duration of the appointment in minutes',
    example: '15',
  })
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Title of the appointment',
    example: 'Patient Consultation: John Doe',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Notes of the appointment',
    example: 'X-ray results are to be analyzed',
  })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'If appointment is recurring/repeating',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isRepeating: boolean;

  @ApiProperty({
    required: true,
    type: String,
    description:
      'Interval for each appointment repeat. Example: Repeat every 1 day/s means everyday',
    example: '5',
  })
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  @ValidateIf(obj => obj.isRepeating)
  interval: number;

  @ApiProperty({
    required: true,
    enum: AppointmentIntervalUnits,
    description: 'Interval unit of the appointment',
    example: Object.values(AppointmentIntervalUnits),
  })
  @IsEnum(AppointmentIntervalUnits)
  @ValidateIf(obj => obj.isRepeating)
  intervalUnit: AppointmentIntervalUnits;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'Repeat appointments until this date',
    example: '2024-09-16T05:22:06.219Z',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsLaterThan('appointmentStart', {
    message:
      'Until datetime should be greater than appointmentStart datetime',
  })
  @ValidateIf(obj => obj.isRepeating && obj.until)
  until: Date;

  @ApiProperty({
    required: true,
    type: String,
    description:
      'Count of appointment repeats. It will be ignored if until date field has value',
    example: '5',
  })
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  @ValidateIf(obj => obj.isRepeating && !obj.until)
  count: number;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Include weekends for the appointment repeats',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @ValidateIf(obj => obj.isRepeating)
  includeWeekend: boolean;
}
