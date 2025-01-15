import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLaboratoryRequestDto {
  @ApiProperty({ description: 'Array of analysis IDs' })
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @IsUUID('all', { each: true })
  analyses: string[];

  @ApiProperty({ description: "Patient's user IDs" })
  @IsString()
  @IsUUID()
  patient: string;

  @ApiProperty({ description: 'Due date of the laboratory request' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dueDate: Date;

  @ApiProperty({
    description: 'Date of laboratory request required ',
  })
  @IsBoolean()
  @IsOptional()
  dateRequired?: boolean;

  @ApiProperty({
    description: 'Noticed or remarks of the laboratory request',
  })
  @IsOptional()
  @IsString()
  noticed?: string;
}
