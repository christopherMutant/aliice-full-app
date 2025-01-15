import { Country } from '../../../core-modules/all-entities';
import { ISeeder } from '../seeder.type';

export const CountrySeeder: ISeeder<Country> = {
  getData: (): Partial<Country>[] => {
    return [
      {
        name: 'Switzerland',
        shortName: 'CH',
      },
      {
        name: 'Lichtenstein',
        shortName: 'LI',
      },
    ];
  },
  uniquenessField: 'id',
  entity: Country as never,
};
