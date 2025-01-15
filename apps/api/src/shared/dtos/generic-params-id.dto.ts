import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class GenericParamID {
  @ApiProperty({
    description: 'ID of resource',
    required: true,
  })
  @IsUUID()
  @Type(() => String)
  @IsNotEmpty()
  id: string;
}
