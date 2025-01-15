import { ApiProperty } from '@nestjs/swagger';
import { CategoryPeople } from '../entities/category_person.entity';

export class CategoryPeopleListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Category of People list',
    type: [CategoryPeople],
  })
  data: CategoryPeople[];
}
