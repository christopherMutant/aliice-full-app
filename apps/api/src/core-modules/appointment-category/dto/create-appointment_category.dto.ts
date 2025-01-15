import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentCategoryDto {
  @ApiProperty({
    description: 'Name of the appointment category',
    example: 'Discussion',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Color of the appointment category',
    example: '#32a852',
  })
  @IsNotEmpty()
  @IsString()
  color: string;
}
