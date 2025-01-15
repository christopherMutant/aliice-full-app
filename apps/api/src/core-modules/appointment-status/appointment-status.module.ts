import { Module } from '@nestjs/common';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusController } from './appointment-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentStatus } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentStatus])],
  controllers: [AppointmentStatusController],
  providers: [AppointmentStatusService],
  exports: [AppointmentStatusService],
})
export class AppointmentStatusModule {}
