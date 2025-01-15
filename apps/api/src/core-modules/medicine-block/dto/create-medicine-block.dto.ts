import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMedicineBlockDto {
  @ApiProperty({ description: 'Name of the medcine block' })
  @IsString()
  name: string;
}
