import { AppointmentStatus } from '../entities/appointment-status.entity';

export class AppointmentStatusInListTransformer extends AppointmentStatus {
  constructor(appointmentStatus: AppointmentStatus) {
    super();
    this.id = appointmentStatus.id;
    this.name = appointmentStatus.name;
  }
}
