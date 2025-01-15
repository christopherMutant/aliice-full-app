import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    required: true,
    type: Date,
    description: 'Date time of the consultation',
    example: new Date(),
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Subject of the consultation',
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
  patient: string;

  @ApiProperty({
    description: "Doctors's User ID",
    example: '39386107-f89d-4659-8c02-83ac4922d431',
  })
  @IsString()
  @IsUUID()
  doctor: string;
}
