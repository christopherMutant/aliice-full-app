import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Appointment,
  AboutAppointment,
  Agenda,
  AppointmentOccurrence,
  User,
} from '../all-entities';
import { DepartmentsModule } from '../departments/departments.module';
import { UserModule } from '../user/user.module';
import { AgendaModule } from '../agenda/agenda.module';
import { AppointmentCategoryModule } from '../appointment-category/appointment-category.module';
import { AppointmentStatusModule } from '../appointment-status/appointment-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AboutAppointment,
      AppointmentOccurrence,
      User,
      Agenda,
    ]),
    AgendaModule,
    UserModule,
    DepartmentsModule,
    AppointmentCategoryModule,
    AppointmentStatusModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
