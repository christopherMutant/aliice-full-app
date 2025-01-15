import { ISeeder } from '../seeder.type';
import { DiagnosticCatalogueEntry } from '../../../core-modules/diagnostic-catalogue-entry/entities/diagnostic-catalogue-entry.entity';

export const DiagnosticCatalogueEntrySeeder: ISeeder<DiagnosticCatalogueEntry> =
  {
    getData: (): Partial<DiagnosticCatalogueEntry>[] => {
      return [
        {
          code: 'A',
          description: 'A. Cardiovascular system',
        },
        {
          code: 'B',
          description: 'B. Blood / bone Marrow / spleen',
        },
        {
          code: 'C',
          description: 'C. Lung / respiratory system',
        },
        {
          code: 'CD',
          description: 'Additional codes',
        },
        {
          code: 'D',
          description: 'D. Skeleton / musculoskeletal system',
        },
        {
          code: 'E',
          description: 'E. Digestive tract',
        },
        {
          code: 'F',
          description: 'F. Metabolism',
        },
        {
          code: 'G',
          description: 'G. Infectious parasitic disease',
        },
        {
          code: 'H',
          description: 'H. Kidney and urinary tract',
        },
        {
          code: 'I',
          description: 'I. Genitals',
        },
        {
          code: 'K',
          description: 'K. Pregnancy / infertility',
        },
        {
          code: 'L',
          description: 'L. Nervous system',
        },
        {
          code: 'M',
          description: 'M. Mental illnesses',
        },
        {
          code: 'N',
          description: 'N. Skin',
        },
        {
          code: 'O',
          description: 'O. Neck / nose / ears',
        },
        {
          code: 'P',
          description: 'P. Eye',
        },
        {
          code: 'Q',
          description: 'Q. Teeth / jaw',
        },
        {
          code: 'R',
          description: 'R. Accident / consequences of the accident',
        },
        {
          code: 'S',
          description: 'S. Services not covered by insurance',
        },
        {
          code: 'T',
          description: 'T. Preventive measures',
        },
        {
          code: 'U',
          description:
            'U. Guidance from the medical advisor (instead of diagnosis)',
        },
      ];
    },
    uniquenessField: 'id',
    entity: DiagnosticCatalogueEntry as never,
  };
