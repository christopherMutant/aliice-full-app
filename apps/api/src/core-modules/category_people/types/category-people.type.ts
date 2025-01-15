import { ApiProperty } from '@nestjs/swagger';
import { CategoryPeople } from '../entities/category_person.entity';

export class CategoryPeopleType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Category Of People Details',
    type: CategoryPeople,
  })
  data: CategoryPeople;
}
