import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
