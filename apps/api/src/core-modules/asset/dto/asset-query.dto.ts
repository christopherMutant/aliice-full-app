import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssetQueryDto {
  @ApiProperty()
  @IsUUID()
  patient: string;
}
