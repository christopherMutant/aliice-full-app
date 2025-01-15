import { ApiProperty } from '@nestjs/swagger';
import { Reference } from '../entities/reference.entity';

export class ReferenceType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Reference Details',
    type: Reference,
  })
  data: Reference;
}
