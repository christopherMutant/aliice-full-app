import { PartialType } from '@nestjs/swagger';
import { CreateMedicineBlockEntryDto } from './create-medicine-block-entry.dto';

export class UpdateMedicineBlockEntryDto extends PartialType(
  CreateMedicineBlockEntryDto,
) {}
