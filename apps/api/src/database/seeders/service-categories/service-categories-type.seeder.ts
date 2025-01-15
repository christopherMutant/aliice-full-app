import { ISeeder } from '../seeder.type';
import { ServiceCategory } from '../../../core-modules/all-entities';

export const ServiceCategoriesSeeder: ISeeder<ServiceCategory> = {
  getData: (): Partial<ServiceCategory>[] => {
    return [
      {
        name: 'All',
      },
      {
        name: 'Blocks',
      },
    ];
  },
  uniquenessField: 'id',
  entity: ServiceCategory as never,
};
