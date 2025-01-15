import { ISeeder } from '../seeder.type';
import { RefRoleKeys } from '../../../shared/types/enums';
import { RefRole } from '../../../core-modules/all-entities';
import { GlobalHelper } from '../../../config/app-global-helper';

export const RolesSeeder: ISeeder<RefRole> = {
  getData: (): Partial<RefRole>[] => {
    return [
      {
        name: 'Super Admin',
        key: RefRoleKeys.SUPER_ADMIN,
        permissions: GlobalHelper.superAdminDefaultPermissions(),
      },
      {
        name: 'Doctor',
        key: RefRoleKeys.DOCTOR,
        permissions: GlobalHelper.doctorDefaultPermissions(),
      },
      {
        name: 'Patient',
        key: RefRoleKeys.PATIENT,
        permissions: GlobalHelper.patientDefaultPermissions(),
      },
      { name: 'Nurse', key: RefRoleKeys.NURSE },
      { name: 'Accountant', key: RefRoleKeys.ACCOUNTANT },
      { name: 'Receptionist', key: RefRoleKeys.RECEPTIONIST },
      {
        name: 'Front Desk',
        key: RefRoleKeys.FRONT_DESK,
        permissions: GlobalHelper.frontDeskDefaultPermissions(),
      },
    ];
  },
  uniquenessField: 'key',
  entity: RefRole as never,
};
