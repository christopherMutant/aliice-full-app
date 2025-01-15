import { ApiProperty } from '@nestjs/swagger';

export class RefEntityProperties {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  key: string;
}

export class GenericRefEntityListSuccessResponse<T> {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [RefEntityProperties] })
  data: T[];
}
