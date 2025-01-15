import { Module } from '@nestjs/common';
import { MedicineBlockService } from './medicine-block.service';
import { MedicineBlockController } from './medicine-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineBlock } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineBlock])],
  controllers: [MedicineBlockController],
  providers: [MedicineBlockService],
  exports: [MedicineBlockService],
})
export class MedicineBlockModule {}
