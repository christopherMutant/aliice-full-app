import { Canton } from '../entities/canton.entity';

export class CantonTransfomer extends Canton {
  constructor(canton: Canton) {
    super();

    Object.assign(this, canton);

    delete this.updatedAt;
    delete this.deletedAt;
    delete this.createdAt;
    delete this.createdBy;
    delete this.updatedBy;
    delete this.deletedBy;
    delete this.id;
  }
}
