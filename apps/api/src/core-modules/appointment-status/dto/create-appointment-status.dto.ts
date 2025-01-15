import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentStatusDto {
  @ApiProperty({
    description: 'Name of the appointment status',
    example: 'Pending',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Path to the icon of the appointment status',
    example: '/icons/operation.svg',
  })
  @IsNotEmpty()
  @IsString()
  icon: string;
}
