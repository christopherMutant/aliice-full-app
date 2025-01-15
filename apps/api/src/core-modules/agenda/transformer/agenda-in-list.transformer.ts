import { Agenda } from '../../all-entities';

export class AgendaInListTransformer extends Agenda {
  title: string;

  constructor(agenda: Agenda) {
    super();
    this.id = agenda.id;
    this.name = agenda.name;
    this.title = agenda.title;
    this.color = agenda.color;
  }
}
