import { ISeeder } from '../seeder.type';
import { AppointmentStatus } from '../../../core-modules/all-entities';

export const AppointmentStatusSeeder: ISeeder<AppointmentStatus> = {
  getData: (): Partial<AppointmentStatus>[] => {
    return [
      {
        name: 'Pending',
        icon: '/icons',
      },
      {
        name: 'Cancelled',
        icon: '/icons',
      },
    ];
  },
  uniquenessField: 'id',
  entity: AppointmentStatus as never,
};
