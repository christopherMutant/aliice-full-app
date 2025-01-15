import { Module } from '@nestjs/common';
import { MedicineBlockEntriesService } from './medicine-block-entries.service';
import { MedicineBlockEntriesController } from './medicine-block-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineBlockEntry } from '../all-entities';
import { MedicineModule } from '../medicine/medicine.module';
import { MedicineBlockModule } from '../medicine-block/medicine-block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicineBlockEntry]),
    MedicineModule,
    MedicineBlockModule,
  ],
  controllers: [MedicineBlockEntriesController],
  providers: [MedicineBlockEntriesService],
  exports: [MedicineBlockEntriesService],
})
export class MedicineBlockEntriesModule {}
