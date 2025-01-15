import { Module } from '@nestjs/common';
import { AppointmentCategoryService } from './appointment-category.service';
import { AppointmentCategoryController } from './appointment-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentCategory } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentCategory])],
  controllers: [AppointmentCategoryController],
  providers: [AppointmentCategoryService],
  exports: [AppointmentCategoryService],
})
export class AppointmentCategoryModule {}
