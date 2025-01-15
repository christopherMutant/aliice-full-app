import { AppointmentStatus } from '../entities/appointment-status.entity';

export class AppointmentStatusTransformer extends AppointmentStatus {
  constructor(appointmentStatus: AppointmentStatus) {
    super();
    Object.assign(this, appointmentStatus);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
