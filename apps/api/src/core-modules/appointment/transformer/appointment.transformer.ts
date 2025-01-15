import { Appointment } from '../../all-entities';
import { AppointmentStatusTransformer } from '../../appointment-status/transformer/appointment-status.transformer';
import { DepartmentTransformer } from '../../departments/transformers/department.transformer';
import { UserTransformer } from '../../user/transformers/user.transformer';
import { AboutAppointmentTransformer } from './about-appointment.transformer';
import { AppointmentOccurenceTransformer } from './appointment-occurence.transformer';

export class AppointmentTransformer extends Appointment {
  constructor(appointment: Appointment) {
    super();
    Object.assign(this, appointment);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.patient) {
      this.patient = new UserTransformer(this.patient);
    }

    if (this.doctor) {
      this.doctor = new UserTransformer(this.doctor);
    }

    if (!this.department && this.doctor) {
      this.department = new DepartmentTransformer(
        this.doctor.department,
      );
    }

    if (this.status) {
      this.status = new AppointmentStatusTransformer(this.status);
    }

    this.aboutAppointment = new AboutAppointmentTransformer(
      this.aboutAppointment,
    );

    if (!this.isRepeating) {
      delete this.occurrences;
    }

    if (this.occurrences) {
      this.occurrences = this.occurrences.map(
        occurence => new AppointmentOccurenceTransformer(occurence),
      );
    }
  }
}
