import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalNoteChildDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  value: string;
}
