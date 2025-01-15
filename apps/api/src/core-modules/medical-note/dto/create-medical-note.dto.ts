import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMedicalNoteDto {
  @ApiProperty({
    description: "Patient's User ID",
  })
  @IsString()
  @IsUUID()
  patient: string;

  @ApiProperty({
    description: 'Automatically display window',
  })
  @IsOptional()
  @IsBoolean()
  automaticallyDisplayWindow: boolean;
}
