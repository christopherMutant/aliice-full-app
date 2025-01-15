import { PartialType } from '@nestjs/swagger';
import { CreateCategoryReferenceDto } from './create-category_reference.dto';

export class UpdateCategoryReferenceDto extends PartialType(
  CreateCategoryReferenceDto,
) {}
