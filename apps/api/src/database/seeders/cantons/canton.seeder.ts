import { Canton } from '../../../core-modules/all-entities';
import { ISeeder } from '../seeder.type';

export const CantonSeeder: ISeeder<Canton> = {
  getData: (): Partial<Canton>[] => {
    return [
      {
        name: 'Aargau',
        shortName: 'AG',
      },
      {
        name: 'Appenzell Innerrhoden',
        shortName: 'AI',
      },
      {
        name: 'Appenzell Ausserrhoden',
        shortName: 'AR',
      },
      {
        name: 'Bern',
        shortName: 'BE',
      },
      {
        name: 'Basel-Landschaft',
        shortName: 'BL',
      },
      {
        name: 'Fribourg',
        shortName: 'FR',
      },
      {
        name: 'Basel-Stadt',
        shortName: 'BS',
      },
      {
        name: 'Geneva',
        shortName: 'GE',
      },
      {
        name: 'Glarus',
        shortName: 'GL',
      },
      {
        name: 'Graubünden',
        shortName: 'GR',
      },
      {
        name: 'Jura',
        shortName: 'JU',
      },
      {
        name: 'Lucerne',
        shortName: 'LU',
      },
      {
        name: 'Neuchâtel',
        shortName: 'NE',
      },
      {
        name: 'Nidwalden',
        shortName: 'NW',
      },
      {
        name: 'Obwalden',
        shortName: 'OW',
      },
      {
        name: 'St. Gallen',
        shortName: 'SG',
      },
      {
        name: 'Schaffhausen',
        shortName: 'SH',
      },
      {
        name: 'Solothurn',
        shortName: 'SO',
      },
      {
        name: 'Schwyz',
        shortName: 'SZ',
      },
      {
        name: 'Ticino',
        shortName: 'TI',
      },
      {
        name: 'Thurgau',
        shortName: 'TG',
      },
      {
        name: 'Uri',
        shortName: 'UR',
      },
      {
        name: 'Vaud',
        shortName: 'VD',
      },
      {
        name: 'Valais',
        shortName: 'VS',
      },
      {
        name: 'Zug',
        shortName: 'ZG',
      },
      {
        name: 'Zürich',
        shortName: 'ZH',
      },
    ];
  },
  uniquenessField: 'id',
  entity: Canton as never,
};
