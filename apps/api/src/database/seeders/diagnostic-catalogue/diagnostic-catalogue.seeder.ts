import { ISeeder } from '../seeder.type';
import { DiagnosticCatalogue } from '../../../core-modules/diagnostic-catalogue-entry/entities/diagnostic-catalogue.entity';
import { DefaultDiagnosticCatalogues } from '../../../shared/types/enums';

export const DiagnosticCatalogueSeeder: ISeeder<DiagnosticCatalogue> =
  {
    getData: (): Partial<DiagnosticCatalogue>[] => {
      return [
        {
          name: DefaultDiagnosticCatalogues.TARMED,
        },
        {
          name: DefaultDiagnosticCatalogues.TEXT,
        },
      ];
    },
    uniquenessField: 'id',
    entity: DiagnosticCatalogue as never,
  };
