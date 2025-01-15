import { ISeeder } from '../seeder.type';
import { Medicine } from '../../../core-modules/medicine/entities/medicine.entity';

export const MedicineSeeder: ISeeder<Medicine> = {
  getData: (): Partial<Medicine>[] => {
    return [
      {
        name: 'Aspirin',
        description: 'Used to reduce pain, fever, or inflammation',
        manufacturer: 'Bayer',
      },
      {
        name: 'Ibuprofen',
        description:
          'Nonsteroidal anti-inflammatory drug (NSAID) for pain and fever',
        manufacturer: 'Advil',
      },
      {
        name: 'Paracetamol',
        description: 'Pain reliever and a fever reducer',
        manufacturer: 'Panadol',
      },
      {
        name: 'Omeprazole',
        description:
          'Used to treat gastroesophageal reflux disease (GERD)',
        manufacturer: 'Losec',
      },
      {
        name: 'Atorvastatin',
        description: 'Used to lower cholesterol',
        manufacturer: 'Pfizer',
      },
      {
        name: 'Clexane',
        description: 'Anticoagulant used to prevent blood clots',
        manufacturer: 'Sanofi',
      },
      {
        name: 'Cetirizine',
        description: 'Antihistamine for allergy relief',
        manufacturer: 'Zyrtec',
      },
      {
        name: 'Metformin',
        description: 'Used to treat type 2 diabetes',
        manufacturer: 'Glucophage',
      },
      {
        name: 'Amlodipine',
        description:
          'Calcium channel blocker used to treat high blood pressure',
        manufacturer: 'Norvasc',
      },
      {
        name: 'Losartan',
        description:
          'Used to treat high blood pressure and protect kidneys',
        manufacturer: 'Cozaar',
      },
      {
        name: 'Salbutamol',
        description: 'Bronchodilator used to treat asthma and COPD',
        manufacturer: 'Ventolin',
      },
      {
        name: 'Levothyroxine',
        description: 'Thyroid hormone used to treat hypothyroidism',
        manufacturer: 'Euthyrox',
      },
      {
        name: 'Prednisolone',
        description: 'Corticosteroid used to reduce inflammation',
        manufacturer: 'Predsol',
      },
      {
        name: 'Amoxicillin',
        description: 'Antibiotic used to treat bacterial infections',
        manufacturer: 'Augmentin',
      },
      {
        name: 'Diazepam',
        description:
          'Used to treat anxiety, alcohol withdrawal, and seizures',
        manufacturer: 'Valium',
      },
    ];
  },
  uniquenessField: 'id',
  entity: Medicine as never,
};
