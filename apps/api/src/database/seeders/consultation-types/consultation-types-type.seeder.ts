import { ISeeder } from '../seeder.type';
import { ConsultationType } from '../../../core-modules/all-entities';
import {
  ConsultationBodyTypes,
  DataSensitivityTypes,
  OpenClosedStatus,
  MedicineTypes,
} from '../../../shared/types/enums';

export const ConsultationTypeSeeder: ISeeder<ConsultationType> = {
  getData: (): Partial<ConsultationType>[] => {
    return [
      {
        name: ConsultationBodyTypes.TEXT,
        structure: { text: 'string' },
      },
      {
        name: ConsultationBodyTypes.MEDICINE,
        structure: {
          table: [
            {
              type: Object.values(MedicineTypes),
              product: 'string',
              packSize: 'string',
              dosage: 'string',
              noteForDosage: 'string',
              duration: 'string',
              quantity: 'number',
              indications: 'string',
              medicationPlan: 'boolean',
              drivers: 'string',
            },
          ],
          validFor: 'number',
        },
      },
      {
        name: ConsultationBodyTypes.DOCUMENT,
        structure: {
          table: [
            {
              status: Object.values(OpenClosedStatus),
              type: 'string',
              date: 'date',
              name: 'string',
              category: 'string',
              address: 'string',
              dataSensitivity: Object.values(DataSensitivityTypes),
              description: 'string',
            },
          ],
        },
      },
      {
        name: ConsultationBodyTypes.INABILITY,
        structure: {
          table: [
            {
              date: 'string',
              days: 'number',
              incapacityForWork: 'number',
              ability: 'number',
              cause: 'string',
              documentUrl: 'string',
            },
          ],
        },
      },
      {
        name: ConsultationBodyTypes.ANALYSIS,
        structure: {
          table: [
            {
              analysis: 'string',
              value: 'number',
              unit: 'string',
              reference: 'string',
              result: 'string',
            },
          ],
        },
      },
      {
        name: ConsultationBodyTypes.SERVICE,
        structure: {
          table: [
            {
              code: 'string',
              referenceService: 'string',
              description: 'string',
              remark: 'string',
              side: 'string',
              nonMandatoryService: 'boolean',
              quantity: 'number',
              tarrifPoint: 'number',
              pointValue: 'number',
              vat: 'number',
              total: 'number',
              information: 'string',
            },
          ],
          control: 'boolean',
        },
      },
    ];
  },
  uniquenessField: 'id',
  entity: ConsultationType as never,
};
