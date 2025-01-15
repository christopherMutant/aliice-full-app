import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentCategoryDto } from './create-appointment_category.dto';

export class UpdateAppointmentCategoryDto extends PartialType(
  CreateAppointmentCategoryDto,
) {}
