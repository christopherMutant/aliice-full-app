import { PartialType } from '@nestjs/swagger';
import { CreateCategoryPersonDto } from './create-category_person.dto';

export class UpdateCategoryPersonDto extends PartialType(
  CreateCategoryPersonDto,
) {}
