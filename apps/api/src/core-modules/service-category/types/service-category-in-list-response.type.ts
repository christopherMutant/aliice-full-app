import { ApiProperty } from '@nestjs/swagger';

export class ServiceCategoryInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
