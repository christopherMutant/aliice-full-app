import { PartialType } from '@nestjs/swagger';
import { CreateServiceBlockDto } from './create-service-block.dto';

export class UpdateServiceBlockDto extends PartialType(
  CreateServiceBlockDto,
) {}
