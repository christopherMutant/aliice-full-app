import { AppointmentOccurrence } from '../../all-entities';
import { AppointmentStatusTransformer } from '../../appointment-status/transformer/appointment-status.transformer';

export class AppointmentOccurenceTransformer extends AppointmentOccurrence {
  constructor(appointmentOccurrence: AppointmentOccurrence) {
    super();
    Object.assign(this, appointmentOccurrence);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.status) {
      this.status = new AppointmentStatusTransformer(this.status);
    }
  }
}
