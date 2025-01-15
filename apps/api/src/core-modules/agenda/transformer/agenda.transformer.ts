import { Agenda } from '../../all-entities';
import { AboutAppointmentTransformer } from '../../appointment/transformer/about-appointment.transformer';
import { UserTransformer } from '../../user/transformers/user.transformer';

export class AgendaTransformer extends Agenda {
  constructor(agenda: Agenda) {
    super();
    Object.assign(this, agenda);
    delete this.updatedAt;
    delete this.deletedAt;
    delete this.updatedBy;
    delete this.createdBy;
    delete this.deletedBy;

    if (this.owner) {
      this.owner = new UserTransformer(this.owner);
    }

    if (this.client) {
      this.client = new UserTransformer(this.client);
    }

    if (this.aboutAppointments) {
      const aboutAppointments = this.aboutAppointments.map(
        aboutAppointments => {
          const transformedAboutAppointment =
            new AboutAppointmentTransformer(aboutAppointments);
          delete transformedAboutAppointment.agendas;
          return transformedAboutAppointment;
        },
      );
      this.aboutAppointments = aboutAppointments;
    }
  }
}
