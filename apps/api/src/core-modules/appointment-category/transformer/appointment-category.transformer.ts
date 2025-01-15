import { AppointmentCategory } from '../entities/appointment-category.entity';

export class AppointmentCategoryTransformer extends AppointmentCategory {
  constructor(appointmentCategory: AppointmentCategory) {
    super();
    Object.assign(this, appointmentCategory);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;
  }
}
