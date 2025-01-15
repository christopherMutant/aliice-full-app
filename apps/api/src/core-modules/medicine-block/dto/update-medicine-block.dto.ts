import { PartialType } from '@nestjs/swagger';
import { CreateMedicineBlockDto } from './create-medicine-block.dto';

export class UpdateMedicineBlockDto extends PartialType(
  CreateMedicineBlockDto,
) {}
