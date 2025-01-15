import { AppointmentCategory } from '../entities/appointment-category.entity';

export class AppointmentCategoryInListTransformer extends AppointmentCategory {
  constructor(appointmentCategory: AppointmentCategory) {
    super();
    this.id = appointmentCategory.id;
    this.name = appointmentCategory.name;
    this.color = appointmentCategory.color;
  }
}
