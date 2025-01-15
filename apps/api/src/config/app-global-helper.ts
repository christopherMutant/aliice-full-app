import { User } from '../core-modules/all-entities';
import { IPaginationLimitOffset } from '../shared/interfaces/pagination.interface';
import * as crypto from 'crypto';
import { RefRoleKeys } from '../shared/types/enums';
import * as lodash from 'lodash';
import { RecursiveObject } from '../shared/types/recursive-object.type';

export class GlobalHelper {
  static generateRandomNumber(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }

  static generateRandomString(size?: number): string {
    const byteSize = size || 64;
    return crypto.randomBytes(byteSize).toString('hex');
  }

  static capitalizeFirstLetterOfString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static generateUniqueId(prefix = '', length = 5): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomChars = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
    return `${prefix}-${randomChars}`;
  }

  static getPaginationLimitOffSet(
    limit?: number,
    offset?: number,
  ): IPaginationLimitOffset {
    return {
      limit: limit || 50,
      offset: offset || 0,
    };
  }

  static UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  static LIMIT = 50;
  static OFFSET = 0;

  static patientDefaultPermissions(): string[] {
    return [
      'appointment_book',
      'appointment_get',
      'appointment_view',
      'appointment_update',
      'appointment_cancel',
      'medicine_view',
      'get_profile',
      'doctor_get',
      'update_profile',
      'delete_my_account',
      'logout',
    ];
  }

  static doctorDefaultPermissions(): string[] {
    return [
      'appointment_book',
      'appointment_get',
      'appointment_view',
      'appointment_get_patients',
      'appointment_update',
      'appointment_cancel',
      'medicine_get',
      'medicine_view',
      'medicine_create',
      'medicine_update',
      'checkup_view',
      'checkup_create',
      'checkup_update',
      'checkup_delete',
      'procedures_view',
      'procedures_create',
      'procedures_update',
      'procedures_delete',
      'inability_view',
      'inability_create',
      'inability_update',
      'inability_delete',
      'get_profile',
      'patient_get',
      'update_profile',
      'delete_my_account',
      'logout',
    ];
  }

  static superAdminDefaultPermissions(): string[] {
    return [
      'user_create',
      'user_update',
      'user_view',
      'user_delete',
      'user_get',
      'appointment_book',
      'appointment_get_list',
      'appointment_get_calendar',
      'appointment_view',
      'appointment_update',
      'appointment_cancel',
      'appointment_category_create',
      'appointment_category_get',
      'appointment_category_get_list',
      'appointment_category_view',
      'appointment_category_update',
      'appointment_status_create',
      'appointment_status_get',
      'appointment_status_get_list',
      'appointment_status_view',
      'appointment_status_update',
      'icon_upload',
      'icon_get',
      'about_appointment_create',
      'about_appointment_get',
      'about_appointment_get_title',
      'agenda_create',
      'agenda_get',
      'agenda_get_list',
      'agenda_view',
      'agenda_update',
      'medicine_get',
      'medicine_view',
      'department_create',
      'department_update',
      'department_view',
      'department_get',
      'patient_get',
      'doctor_get',
      'role_create',
      'role_update',
      'role_view',
      'role_get',
      'permission_create',
      'permission_update',
      'permission_view',
      'permission_get',
      'reference_create',
      'reference_update',
      'category_reference_create',
      'category_reference_update',
      'category_reference_get',
      'bankdetails_create',
      'bankdetails_update',
      'bankdetails_view',
      'bankdetails_get',
      'family_create',
      'family_update',
      'family_view',
      'insurance_create',
      'insurance_update',
      'category_people_create',
      'category_people_update',
      'category_people_get',
      'category_organization_create',
      'category_organization_update',
      'category_organization_get',
      'ref_insurance_create',
      'ref_insurance_update',
      'ref_insurance_view',
      'ref_insurance_get',
      'country_get',
      'country_view',
      'canton_get',
      'canton_view',
      'city_update',
      'city_get',
      'city_view',
      'checkup_view',
      'checkup_create',
      'checkup_update',
      'checkup_delete',
      'inability_view',
      'inability_create',
      'inability_update',
      'inability_delete',
      'procedures_view',
      'procedures_create',
      'procedures_update',
      'procedures_delete',
      'consultation_get',
      'consultation_view',
      'consultation_create',
      'consultation_update',
      'consultation_body_view',
      'consultation_body_create',
      'consultation_body_update',
      'consultation_body_entry_view',
      'consultation_body_entry_create',
      'consultation_body_entry_update',
      'consultation_title_get',
      'consultation_title_view',
      'consultation_title_create',
      'consultation_title_update',
      'consultation_type_get',
      'consultation_type_view',
      'analysis_get',
      'analysis_view',
      'analysis_create',
      'analysis_update',
      'analysis_result_view',
      'analysis_result_get',
      'analysis_result_create',
      'analysis_result_update',
      'diagnostic_get',
      'diagnostic_view',
      'diagnostic_create',
      'diagnostic_update',
      'diagnostic_delete',
      'diagnostic_catalogue_get',
      'diagnostic_catalogue_entry_get',
      'diagnostic_catalogue_entry_create',
      'diagnostic_catalogue_entry_view',
      'diagnostic_catalogue_entry_update',
      'diagnostic_catalogue_entry_relations',
      'invoice_attachment_upload',
      'invoice_attachment_view',
      'patient_case_create',
      'patient_case_get',
      'patient_case_view',
      'patient_case_update',
      'medicine_block_create',
      'medicine_block_view',
      'medicine_block_get',
      'medicine_block_update',
      'medicine_block_entry_create',
      'medicine_block_entry_view',
      'medicine_block_entry_update',
      'laboratory_request_create',
      'laboratory_request_view',
      'laboratory_request_get',
      'laboratory_request_update',
      'consultation_document_upload',
      'consultation_document_get',
      'consultation_document_view',
      'consultation_document_update',
      'invoice_create',
      'invoice_view',
      'invoice_get',
      'invoice_update',
      'asset_create',
      'asset_get',
      'asset_view',
      'asset_update',
      'medical_note_view',
      'medical_note_update',
      'medical_note_child_history_get',
      'medical_note_child_update',
      'service_create',
      'service_view',
      'service_get',
      'service_update',
      'service_block_create',
      'service_block_get',
      'service_block_view',
      'service_block_update',
      'user_address_create',
      'user_address_update',
      'get_profile',
      'update_profile',
      'company_create',
      'company_update',
      'company_view',
      'company_get',
      'client_get',
      'logout',
    ];
  }

  static frontDeskDefaultPermissions(): string[] {
    return [
      'user_view',
      'appointment_book',
      'appointment_get_list',
      'appointment_get_calendar',
      'appointment_view',
      'appointment_update',
      'appointment_cancel',
      'appointment_category_create',
      'appointment_category_get',
      'appointment_category_get_list',
      'appointment_category_view',
      'appointment_category_update',
      'appointment_status_create',
      'appointment_status_get',
      'appointment_status_get_list',
      'appointment_status_view',
      'appointment_status_update',
      'icon_upload',
      'icon_get',
      'about_appointment_create',
      'about_appointment_get',
      'about_appointment_get_title',
      'agenda_create',
      'agenda_get',
      'agenda_get_list',
      'agenda_view',
      'agenda_update',
      'agenda_delete',
      'medicine_get',
      'medicine_view',
      'medicine_create',
      'medicine_update',
      'department_create',
      'department_update',
      'department_view',
      'department_get',
      'patient_get',
      'doctor_get',
      'reference_create',
      'reference_update',
      'category_reference_create',
      'category_reference_update',
      'category_reference_get',
      'bankdetails_create',
      'bankdetails_update',
      'bankdetails_view',
      'bankdetails_get',
      'bankdetails_delete',
      'family_create',
      'family_update',
      'family_view',
      'insurance_create',
      'insurance_update',
      'category_people_create',
      'category_people_update',
      'category_people_get',
      'category_organization_create',
      'category_organization_update',
      'category_organization_get',
      'ref_insurance_create',
      'ref_insurance_update',
      'ref_insurance_view',
      'ref_insurance_get',
      'ref_insurance_delete',
      'country_get',
      'country_view',
      'canton_get',
      'canton_view',
      'city_get',
      'city_view',
      'checkup_view',
      'checkup_create',
      'procedures_view',
      'procedures_create',
      'procedures_update',
      'inability_view',
      'consultation_get',
      'consultation_view',
      'consultation_create',
      'consultation_update',
      'consultation_body_view',
      'consultation_body_create',
      'consultation_body_update',
      'consultation_body_entry_view',
      'consultation_body_entry_create',
      'consultation_body_entry_update',
      'consultation_title_get',
      'consultation_title_view',
      'consultation_title_create',
      'consultation_title_update',
      'consultation_type_get',
      'consultation_type_view',
      'analysis_get',
      'analysis_view',
      'analysis_create',
      'analysis_update',
      'analysis_delete',
      'analysis_result_view',
      'analysis_result_get',
      'analysis_result_create',
      'analysis_result_update',
      'analysis_result_delete',
      'diagnostic_get',
      'diagnostic_view',
      'diagnostic_create',
      'diagnostic_update',
      'diagnostic_catalogue_get',
      'diagnostic_catalogue_entry_get',
      'diagnostic_catalogue_entry_create',
      'diagnostic_catalogue_entry_view',
      'diagnostic_catalogue_entry_update',
      'invoice_attachment_upload',
      'invoice_attachment_view',
      'invoice_attachment_delete',
      'patient_case_create',
      'patient_case_get',
      'patient_case_view',
      'patient_case_update',
      'patient_case_delete',
      'medicine_block_create',
      'medicine_block_view',
      'medicine_block_get',
      'medicine_block_update',
      'medicine_block_delete',
      'medicine_block_entry_create',
      'medicine_block_entry_view',
      'medicine_block_entry_update',
      'medicine_block_entry_delete',
      'laboratory_request_create',
      'laboratory_request_view',
      'laboratory_request_get',
      'laboratory_request_update',
      'laboratory_request_delete',
      'consultation_document_upload',
      'consultation_document_get',
      'consultation_document_view',
      'consultation_document_update',
      'invoice_create',
      'invoice_view',
      'invoice_get',
      'invoice_update',
      'invoice_delete',
      'asset_create',
      'asset_get',
      'asset_view',
      'asset_update',
      'asset_delete',
      'medical_note_view',
      'medical_note_update',
      'medical_note_child_history_get',
      'medical_note_child_update',
      'service_create',
      'service_view',
      'service_get',
      'service_update',
      'service_delete',
      'service_block_create',
      'service_block_get',
      'service_block_view',
      'service_block_update',
      'service_block_delete',
      'service_group_create',
      'service_group_get',
      'service_group_view',
      'service_group_update',
      'service_group_delete',
      'service_category_create',
      'service_category_get',
      'service_category_view',
      'service_category_update',
      'service_category_delete',
      'user_address_create',
      'user_address_update',
      'get_profile',
      'update_profile',
      'company_create',
      'company_update',
      'company_view',
      'company_get',
      'client_get',
      'logout',
    ];
  }

  static checkAdmin(currentUser: User): boolean {
    return currentUser.userRoles.some(role => {
      return role.refRole.key === RefRoleKeys.SUPER_ADMIN;
    });
  }

  static getNameInitials(fullName: string): string {
    const names = fullName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1]
        .substring(0, 1)
        .toUpperCase();
    }

    return initials;
  }

  static getRecordFileName(fileName: string): string {
    const index = fileName.indexOf('_') + 1;
    return fileName.substring(index);
  }

  static getFileType(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.') + 1);
  }

  static convertKeysToCamelCase(
    obj: RecursiveObject,
  ): RecursiveObject {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      // If the input is not an object or is an array, return it as-is
      return obj;
    }

    return Object.entries(obj).reduce(
      (acc: RecursiveObject, [key, value]) => {
        const camelKey = lodash.camelCase(key); // Convert key to camelCase

        if (value instanceof Date) {
          // Leave Date objects as-is
          acc[camelKey] = value;
        } else if (Array.isArray(value)) {
          // If value is an array, process each item and recursively apply the conversion to objects
          acc[camelKey] = value.map(item =>
            typeof item === 'object' && !Array.isArray(item)
              ? this.convertKeysToCamelCase(item)
              : item,
          );
        } else if (
          value &&
          typeof value === 'object' &&
          value.constructor === Object
        ) {
          // Recursively apply to nested plain objects
          acc[camelKey] = this.convertKeysToCamelCase(value);
        } else {
          // Assign all other values directly
          acc[camelKey] = value;
        }

        return acc;
      },
      {} as RecursiveObject,
    );
  }
}

export const AppConfig = new GlobalHelper();
