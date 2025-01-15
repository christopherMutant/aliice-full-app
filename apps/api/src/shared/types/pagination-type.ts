import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  count: number;
}

export class PaginationType<T> {
  @ApiProperty({
    description:
      'This is the pagination object where we have details',
  })
  pagination: Pagination;

  @ApiProperty({
    description:
      'The response list of data - data type will be dynamic',
  })
  data: T[];
}
