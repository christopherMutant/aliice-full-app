import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAboutAppointmentDto {
  @ApiProperty({
    description: 'Array of Agenda IDs related for this appointment',
    example: '["bb545ff4-eaec-4c6a-a5f1-037875daaf23"]',
  })
  @IsNotEmpty()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsUUID('all', { each: true })
  @IsArray()
  agendas: string[];

  @ApiProperty({
    description: 'Appointment Category ID',
    example: '07691397-8f0f-46ab-bf93-0c04df0ead89',
  })
  @IsNotEmpty()
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
    description: 'Name of the appointment',
    example: 'Injection',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
