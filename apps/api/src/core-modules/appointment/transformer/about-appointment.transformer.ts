import { AgendaTransformer } from '../../agenda/transformer/agenda.transformer';
import { AboutAppointment } from '../../all-entities';
import { AppointmentCategoryTransformer } from '../../appointment-category/transformer/appointment-category.transformer';

export class AboutAppointmentTransformer extends AboutAppointment {
  constructor(aboutAppointment: AboutAppointment) {
    super();
    Object.assign(this, aboutAppointment);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.category) {
      this.category = new AppointmentCategoryTransformer(
        this.category,
      );
    }

    if (this.agendas) {
      this.agendas = this.agendas.map(agenda => {
        const transformedAgenda = new AgendaTransformer(agenda);
        delete transformedAgenda.aboutAppointments;
        return transformedAgenda;
      });
    }
  }
}
