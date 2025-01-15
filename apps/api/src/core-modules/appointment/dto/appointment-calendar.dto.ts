import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsLaterThan } from '../../../shared/decorator/date-is-later.decorator';
import { Transform } from 'class-transformer';
import { OrderSort } from '../../../shared/types/enums';

export enum OrderBy {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  DEPARTMENT = 'department',
  STATUS = 'status',
  DESCRIPTION = 'description',
  START = 'start',
  CATEGORY = 'category',
  TITLE = 'title',
}

export class AppointmentQueryCalendarDto {
  @ApiProperty({
    type: Array,
    required: false,
    description: 'Array of Agenda IDs',
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsUUID('all', { each: true })
  @IsArray()
  agendas: string[];

  @ApiProperty({
    type: Array,
    required: false,
    description: 'Array of Appointment Status IDs',
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsUUID('all', { each: true })
  @IsArray()
  status: string[];

  @ApiProperty({
    type: Array,
    required: false,
    description: 'Array of Appointment Category IDs',
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsUUID('all', { each: true })
  @IsArray()
  category: string[];

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Min date of the appointment start datetime',
  })
  @IsOptional()
  @IsString()
  from: Date;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Max date of the appointment start datetime',
  })
  @IsOptional()
  @IsString()
  @IsLaterThan('from', {
    message: 'To datetime should be greater than from datetime',
  })
  to: Date;

  @ApiProperty({
    required: false,
    enum: OrderSort,
    default: OrderSort.ASC,
  })
  @IsOptional()
  sort: OrderSort = OrderSort.ASC;

  @ApiProperty({
    required: false,
    enum: OrderBy,
    default: OrderBy.START,
  })
  @IsOptional()
  orderBy: OrderBy = OrderBy.START;
}
