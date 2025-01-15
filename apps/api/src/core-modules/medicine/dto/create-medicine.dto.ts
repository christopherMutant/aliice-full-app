import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicineDto {
  @ApiProperty({
    description: 'Medicine name',
    example: 'Tylenol',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Medicine description',
    example:
      'Drug is used to treat mild to moderate pain (from headaches, menstrual periods, toothaches, backaches, osteoarthritis, or cold/flu aches and pains) and to reduce fever.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Medicine manufacturer',
    example: 'Johnson & Johnson',
  })
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
