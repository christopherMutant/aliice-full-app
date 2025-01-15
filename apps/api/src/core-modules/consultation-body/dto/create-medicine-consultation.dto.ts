import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateMedicineConsultationEntryDto } from '../../consultation-body-part-entry/dto/create-medicine-consultation.dto';

export class CreateMedicineConsultationDto {
  @ApiProperty({
    description: 'Consultation Title ID of the consultation text',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsNotEmpty()
  @IsUUID()
  title: string;

  @ApiProperty({
    description: 'Medicine consultation entries',
    type: [CreateMedicineConsultationEntryDto],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @Type(() => CreateMedicineConsultationEntryDto)
  @ValidateNested({ each: true })
  entries?: CreateMedicineConsultationEntryDto[];
}
