import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateConsultationTitleDto {
  @ApiProperty({
    description: 'Name of the consultation title',
    example: 'Motif',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Consultation type',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsUUID()
  @IsNotEmpty()
  type: string;
}
