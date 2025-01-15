import { PartialType } from '@nestjs/swagger';
import { CreateCategoryOrganizationDto } from './create-category-organization.dto';

export class UpdateCategoryOrganizationDto extends PartialType(
  CreateCategoryOrganizationDto,
) {}
