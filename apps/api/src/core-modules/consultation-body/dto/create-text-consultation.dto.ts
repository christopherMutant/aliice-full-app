import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTextConsultationDto {
  @ApiProperty({
    description: 'Consultation Title ID of the consultation text',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsNotEmpty()
  @IsUUID()
  title: string;

  @ApiProperty({
    description: 'Text content of the consultation text',
    example: 'Some text',
  })
  @IsOptional()
  @IsString()
  text: string;
}
