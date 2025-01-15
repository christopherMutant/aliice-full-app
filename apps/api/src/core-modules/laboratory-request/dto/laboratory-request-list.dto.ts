import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LaboratoryRequestQueryDto {
  @ApiProperty({
    description: "Patient's User ID",
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patient: string;
}
