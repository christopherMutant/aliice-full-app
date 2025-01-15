export const ConstantMessage = Object.freeze({
  SUCCESS: 'Operation successful.',
  UN_AUTH: 'Unauthorized access. Please log in.',
  SWAGGER_TITLE: 'Aliice APIs',
  SWAGGER_DESCRIPTION: 'Documentation for the Aliice API',
  SWAGGER_VERSION: '1.0',
  UPDATE_LOG_ERROR:
    'To support audit logs, please use "save" instead of "update".',
  DELETE_LOG_ERROR:
    'To support audit logs, please use "remove" instead of "delete".',
  SOFT_DELETE_LOG_ERROR:
    'To support audit logs, please use "softRemove" instead of "softDelete".',
  NO_RECORD_UPDATE: 'There are no records to update.',
  NO_RECORD_SOFT_REMOVE: 'TThere are no records to soft remove.',
  NO_RECORD_RECOVER: 'There are no records to soft recover.',
  RECORD_CREATED: 'The record has been created successfully.',
  REGISTER:
    'Registration successful. Please verify your email to sign in.',
  SIGN_IN: 'Successfully signed in.',
  REG_CONFLICT:
    'Email already in use. Try another or log in. Forgot your password?  Try to Reset it.',
  ALREADY_EXIST: 'A user with this email already exists.',
  LOGOUT: 'Successfully logged out.',
  REFRESH_TOKENS: 'Tokens refreshed successfully.',
  CHANGE_PASSWORD: 'Password changed successfully.',
  WRONG_CURRENT_PASSWORD:
    'Incorrect current password provided. Please provide the correct password.',

  FORGOT_PASSWORD_SUBJECT: 'Forgot Password',
  CODE_WILL_BE_SENT_IF_ACCOUNT_EXISTS:
    'Verification code will be sent to your email address if your account exists.',
  VERIFICATION_CODE_SENT:
    'Reset password verification code sent to your email.',
  ALREADY_VERIFIED:
    'Your account has already been verified. You can now sign in.',
  ACCOUNT_VERIFIED: 'Your email has been verified successfully.',
  RESET_PASSWORD: 'Password reset successful.',
  VALIDATE_RESET_PASSWORD:
    'The reset password verification code is valid.',
  PROFILE_CREATED: 'Profile created successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',

  ROLE_NOT_FOUND: 'No role found for the provided roleId.',
  PERMISSION_NOT_FOUND:
    'No permission found for the provide permissionId',
  DEPARTMENT_NOT_FOUND:
    'No department found for the provided departmentId.',
  DEPARTMENT_EXIST: 'Department already exist.',
  ROLE_INVALID_UUID: 'Invalid UUID of roleId',
  DEPARTMENT_INVALID_UUID: 'Invalid UUID of departmentId',

  USER_CREATED: 'User successfully created',
  USER_UPDATED: 'User successfully updated',
  USER_DELETE: 'User successfully deleted',
  USER_DISABLED: 'User disabled successfully.',
  USER_FETCHED: 'User data retrieved successfully.',

  DEPARTMENT_CREATED: 'Department successfully created',
  DEPARTMENT_UPDATED: 'Department successfully updated',
  DEPARTMENT_DELETE: 'Department successfully deleted',
  DEPARTMENT_FETCHED: 'Department data retrieved successfully.',

  ROLE_CREATED: 'Role successfully created',
  ROLE_UPDATED: 'Role successfully updated',
  ROLE_DELETE: 'Role successfully deleted',
  ROLE_FETCHED: 'Role data retrieved successfully.',

  PERMISSION_CREATED: 'Permission successfully created',
  PERMISSION_UPDATED: 'Permission successfully updated',
  PERMISSION_DELETE: 'Permission successfully deleted',
  PERMISSION_FETCHED: 'Permission data retrieved successfully.',

  AGENDA_CREATED: 'Agenda successfully created',
  AGENDA_UPDATED: 'Agenda successfully updated',
  AGENDA_DELETE: 'Agenda successfully deleted',
  AGENDA_FETCHED: 'Agenda data retrieved successfully.',
  AGENDA_NOT_FOUND: 'No agenda found for the provided agendaID.',

  APPOINTMENT_CREATED: 'Appointment successfully created',
  APPOINTMENT_UPDATED: 'Appointment successfully updated',
  APPOINTMENT_DELETE: 'Appointment successfully deleted',
  APPOINTMENT_FETCHED: 'Appointment data retrieved successfully.',
  APPOINTMENT_NOT_FOUND:
    'No appointment found for the provided appointmentID.',

  APPOINTMENT_CATEGORY_CREATED:
    'Appointment category successfully created',
  APPOINTMENT_CATEGORY_UPDATED:
    'Appointment category successfully updated',
  APPOINTMENT_CATEGORY_DELETE:
    'Appointment category successfully deleted',
  APPOINTMENT_CATEGORY_FETCHED:
    'Appointment category data retrieved successfully.',
  APPOINTMENT_CATEGORY_NOT_FOUND:
    'No appointment category found for the provided appointment category ID.',

  APPOINTMENT_STATUS_CREATED:
    'Appointment status successfully created',
  APPOINTMENT_STATUS_UPDATED:
    'Appointment status successfully updated',
  APPOINTMENT_STATUS_DELETE:
    'Appointment status successfully deleted',
  APPOINTMENT_STATUS_FETCHED:
    'Appointment status data retrieved successfully.',
  APPOINTMENT_STATUS_NOT_FOUND:
    'No appointment status found for the provided appointment status ID.',

  PRESCRIPTION_CREATED: 'Prescription successfully created',
  PRESCRIPTION_UPDATED: 'Prescription successfully updated',
  PRESCRIPTION_DELETE: 'Prescription successfully deleted',
  PRESCRIPTION_FETCHED: 'Prescription data retrieved successfully.',
  PRESCRIPTION_NOT_FOUND:
    'No prescription found for the provided prescriptionID.',

  MEDICINE_CREATED: 'Medicine successfully created',
  MEDICINE_UPDATED: 'Medicine successfully updated',
  MEDICINE_DELETE: 'Medicine successfully deleted',
  MEDICINE_FETCHED: 'Medicine data retrieved successfully.',
  MEDICINE_NOT_FOUND:
    'No medicine found for the provided medicineID.',

  REFERENCE_CREATED: 'Reference successfully created',
  REFERENCE_UPDATED: 'Reference successfully updated',
  REFERENCE_NOT_FOUND:
    'No reference found for the provided referenceID',

  CATEGORY_REFERENCE_CREATED:
    'Category reference successfully created',
  CATEGORY_REFERENCE_UPDATED:
    'Category reference  successfully updated',
  CATEGORY_REFERENCE_DELETE:
    'Category reference  successfully deleted',
  CATEGORY_REFERENCE_FETCHED:
    'Category reference  data retrieved successfully.',
  CATEGORY_REFERENCE_NOT_FOUND:
    'No category reference found for the provided categoryReferenceID.',

  BANKDETAILS_CREATED: 'Bankdetails successfully created',
  BANKDETAILS_UPDATED: 'Bankdetails successfully updated',
  BANKDETAILS_DELETE: 'Bankdetails successfully deleted',
  BANKDETAILS_FETCHED: 'Bankdetails data retrieved successfully',
  BANKDETAILS_NOT_FOUND:
    'No bankdetails found for the provided bankdetailsID',

  FAMILY_CREATED: 'Family member successfully created',
  FAMILY_UPDATED: 'Family member successfully updated',
  FAMILY_NOT_FOUND:
    'No Family member found for the provided familyID ',

  INSURANCE_CREATED: 'Insurance is succesfully created',
  INSURANCE_UPDATED: 'Insurance is successfully updated',
  INSURANCE_NOT_FOUND:
    'No Insurance is found for the provided insuranceID',

  CATEGORY_PEOPLE_CREATED: 'Category for people created',
  CATEGORY_PEOPLE_UPDATED: 'Category for people successfully updated',
  CATEGORY_PEOPLE_DELETE: 'Category for people successfully deleted',
  CATEGORY_PEOPLE_FETCHED:
    'Category for people data retrieved successfully.',
  CATEGORY_PEOPLE_NOT_FOUND:
    'No category found for the provided categoryPeopleID.',

  CATEGORY_ORGANIZATION_CREATED: 'Category for organization created',
  CATEGORY_ORGANIZATION_UPDATED:
    'Category for organization successfully updated',
  CATEGORY_ORGANIZATION_DELETE:
    'Category for organization successfully deleted',
  CATEGORY_ORGANIZATION_FETCHED:
    'Category for organization data retrieved successfully.',
  CATEGORY_ORGANIZATION_NOT_FOUND:
    'No category found for the provided categoryOrganizationID.',
  USER_ADDRESS_CREATED: 'User address successfully created',
  USER_ADDRESS_UPDATED: 'User address sucessfully updated',
  USER_ADDRESS_NOT_FOUND:
    'No user address found for the provided useraddressId',

  REF_INSURANCE_CREATED: 'Ref insurance successfully created',
  REF_INSURANCE_UPDATED: 'Ref insurance successfully updated',
  REF_INSURANCE_DELETE: 'Ref insurance successfully deleted',
  REF_INSURANCE_FETCHED: 'Ref insurance data retrieved successfully.',
  REF_INSURANCE_NOT_FOUND:
    'No ref insurance found for the provided refInsuranceID.',

  ICONS_UPLOADED: 'Icons successfully uploaded',
  ICONS_FETCHED: 'Icons retrieved successfully',

  COUNTRY_FETCHED: 'Country retrieved successfully',
  COUNTRIES_FETCHED: 'Countries retrieved successfully',
  COUNTRY_NOT_FOUND: 'No country found for the provided countryId',

  CANTON_FETCHED: 'Canton retrieved successfully',
  CANTONS_FETCHED: 'Cantons retrieved successfully',
  CANTON_NOT_FOUND: 'No canton found for the provided cantonId',

  CITY_FETCHED: 'City retrieved successfully',
  CITIES_FETCHED: 'Cities retrieved successfully',
  CITY_NOT_FOUND: 'No city found for the provided cityId',

  CONSULTATION_TYPE_FETCHED:
    'Consultation type retrieved successfully',
  CONSULTATION_TYPE_NOT_FOUND:
    'No consultation type found for the provided consultation typeID',

  CONSULTATION_TITLE_FETCHED:
    'Consultation title retrieved successfully',
  CONSULTATION_TITLE_CREATED:
    'Consultation title created successfully',
  CONSULTATION_TITLE_UPDATED:
    'Consultation title updated successfully',
  CONSULTATION_TITLE_DELETED:
    'Consultation title deleted successfully',
  CONSULTATION_TITLE_NOT_FOUND:
    'No consultation title found for the provided consultation titleID',

  CONSULTATION_FETCHED: 'Consultation retrieved successfully',
  CONSULTATION_CREATED: 'Consultation created successfully',
  CONSULTATION_UPDATED: 'Consultation updated successfully',
  CONSULTATION_DELETED: 'Consultation deleted successfully',
  CONSULTATION_NOT_FOUND:
    'No consultation found for the provided consultationID',

  COMPANY_FETCHED: 'Company retrieved successfully',
  COMPANY_CREATED: 'Company created successfully',
  COMPANY_UPDATED: 'Company updated successfully',
  COMPANY_DELETED: 'Company deleted successfully',
  COMPANY_NOT_FOUND: 'No company  found for the provided companyID',
  CONSULTATION_BODY_FETCHED:
    'Consultation body retrieved successfully',
  CONSULTATION_BODY_CREATED: 'Consultation body created successfully',
  CONSULTATION_BODY_UPDATED: 'Consultation body updated successfully',
  CONSULTATION_BODY_DELETED: 'Consultation body deleted successfully',
  CONSULTATION_BODY_NOT_FOUND:
    'No consultation body found for the provided consultation bodyID',

  CONSULTATION_BODY_ENTRY_FETCHED:
    'Consultation body entry retrieved successfully',
  CONSULTATION_BODY_ENTRY_CREATED:
    'Consultation body entry created successfully',
  CONSULTATION_BODY_ENTRY_UPDATED:
    'Consultation body entry updated successfully',
  CONSULTATION_BODY_ENTRY_DELETED:
    'Consultation body entry deleted successfully',
  CONSULTATION_BODY_ENTRY_NOT_FOUND:
    'No consultation body entry found for the provided consultation body entryID',

  ANALYSIS_FETCHED: 'Analysis retrieved successfully',
  ANALYSIS_CREATED: 'Analysis created successfully',
  ANALYSIS_UPDATED: 'Analysis updated successfully',
  ANALYSIS_DELETED: 'Analysis deleted successfully',
  ANALYSIS_NOT_FOUND: 'No analysis found for the provided analysisId',

  ANALYSIS_RESULT_FETCHED: 'Analysis result retrieved successfully',
  ANALYSIS_RESULT_CREATED: 'Analysis result created successfully',
  ANALYSIS_RESULT_UPDATED: 'Analysis result updated successfully',
  ANALYSIS_RESULT_DELETED: 'Analysis result deleted successfully',
  ANALYSIS_RESULT_NOT_FOUND:
    'No analysis result found for the provided analysis resultId',

  DIAGNOSTIC_FETCHED: 'Diagnostic retrieved successfully',
  DIAGNOSTIC_CREATED: 'Diagnostic created successfully',
  DIAGNOSTIC_UPDATED: 'Diagnostic updated successfully',
  DIAGNOSTIC_DELETED: 'Diagnostic deleted successfully',
  DIAGNOSTIC_NOT_FOUND:
    'No diagnostic found for the provided diagnosticId',

  DIAGNOSTIC_CATALOGUE_NOT_FOUND:
    'No diagnostic catalogue found for the provided diagnostic catalogueId',

  DIAGNOSTIC_CATALOGUE_ENTRY_FETCHED:
    'Diagnostic catalogue entry retrieved successfully',
  DIAGNOSTIC_CATALOGUE_ENTRY_CREATED:
    'Diagnostic catalogue entry created successfully',
  DIAGNOSTIC_CATALOGUE_ENTRY_UPDATED:
    'Diagnostic catalogue entry updated successfully',
  DIAGNOSTIC_CATALOGUE_ENTRY_DELETED:
    'Diagnostic catalogue entry deleted successfully',
  DIAGNOSTIC_CATALOGUE_ENTRY_NOT_FOUND:
    'No diagnostic catalogue entry found for the provided diagnostic catalogue entryId',

  INVOICE_ATTACHMENT_UPLOADED:
    'Invoice attachment uploaded successfully',
  INVOICE_ATTACHMENT_FETCHED:
    'Invoice attachment fetched successfully',
  INVOICE_ATTACHMENT_DELETED:
    'Invoice attachment deleted successfully',
  INVOICE_ATTACHMENT_NOT_FOUND:
    'No invoice attachment found for the provided invoice attachmentId',

  PATIENT_CASE_FETCHED: 'Patient case retrieved successfully',
  PATIENT_CASE_CREATED: 'Patient case created successfully',
  PATIENT_CASE_UPDATED: 'Patient case updated successfully',
  PATIENT_CASE_DELETED: 'Patient case deleted successfully',
  PATIENT_CASE_NOT_FOUND:
    'No patient case found for the provided patient caseId',

  MEDICINE_BLOCK_FETCHED: 'Medicine block retrieved successfully',
  MEDICINE_BLOCK_CREATED: 'Medicine block created successfully',
  MEDICINE_BLOCK_UPDATED: 'Medicine block updated successfully',
  MEDICINE_BLOCK_DELETED: 'Medicine block deleted successfully',
  MEDICINE_BLOCK_NOT_FOUND:
    'No medicine block found for the provided medicine blockId',

  MEDICINE_BLOCK_ENTRY_FETCHED:
    'Medicine block entry retrieved successfully',
  MEDICINE_BLOCK_ENTRY_CREATED:
    'Medicine block entry created successfully',
  MEDICINE_BLOCK_ENTRY_UPDATED:
    'Medicine block entry updated successfully',
  MEDICINE_BLOCK_ENTRY_DELETED:
    'Medicine block entry deleted successfully',
  MEDICINE_BLOCK_ENTRY_NOT_FOUND:
    'No medicine block entry found for the provided medicine block entryId',

  CONSULTATION_DOCUMENT_FORMAT_FETCHED:
    'Consultation document format retrieved successfully',
  CONSULTATION_DOCUMENT_FORMAT_CREATED:
    'Consultation document format created successfully',
  CONSULTATION_DOCUMENT_FORMAT_UPDATED:
    'Consultation document format updated successfully',
  CONSULTATION_DOCUMENT_FORMAT_DELETED:
    'Consultation document format deleted successfully',
  CONSULTATION_DOCUMENT_FORMAT_NOT_FOUND:
    'No Consultation document format found for the provided Consultation document formatId',

  LABORATORY_REQUEST_FETCHED:
    'Laboratory request retrieved successfully',
  LABORATORY_REQUEST_CREATED:
    'Laboratory request created successfully',
  LABORATORY_REQUEST_UPDATED:
    'Laboratory request updated successfully',
  LABORATORY_REQUEST_DELETED:
    'Laboratory request deleted successfully',
  LABORATORY_REQUEST_NOT_FOUND:
    'No laboratory request found for the provided laboratory requestId',

  INVOICE_FETCHED: 'Invoice retrieved successfully',
  INVOICE_CREATED: 'Invoice created successfully',
  INVOICE_UPDATED: 'Invoice updated successfully',
  INVOICE_DELETED: 'Invoice deleted successfully',
  INVOICE_NOT_FOUND: 'No invoice found for the provided invoiceId',

  ASSET_FETCHED: 'Asset retrieved successfully',
  ASSET_CREATED: 'Asset created successfully',
  ASSET_UPDATED: 'Asset updated successfully',
  ASSET_DELETED: 'Asset deleted successfully',
  ASSET_NOT_FOUND: 'No asset found for the provided assetId',

  MEDICAL_NOTE_FETCHED: 'Medical note fetched successfully',
  MEDICAL_NOTE_UPDATED: 'Medical note updated successfully',
  MEDICAL_NOTE_CHILD_UPDATED:
    'Medical note child updated successfully',

  SERVICE_FETCHED: 'Service retrieved successfully',
  SERVICE_CREATED: 'Service created successfully',
  SERVICE_UPDATED: 'Service updated successfully',
  SERVICE_DELETED: 'Service deleted successfully',
  SERVICE_NOT_FOUND: 'No service found for the provided serviceId',

  SERVICE_BLOCK_FETCHED: 'Service block retrieved successfully',
  SERVICE_BLOCK_CREATED: 'Service block created successfully',
  SERVICE_BLOCK_UPDATED: 'Service block updated successfully',
  SERVICE_BLOCK_DELETED: 'Service block deleted successfully',
  SERVICE_BLOCK_NOT_FOUND:
    'No service block found for the provided service blockId',

  SERVICE_GROUP_FETCHED: 'Service group retrieved successfully',
  SERVICE_GROUP_CREATED: 'Service group created successfully',
  SERVICE_GROUP_UPDATED: 'Service group updated successfully',
  SERVICE_GROUP_DELETED: 'Service group deleted successfully',
  SERVICE_GROUP_NOT_FOUND:
    'No service group found for the provided service groupId',

  SERVICE_CATEGORY_FETCHED: 'Service category retrieved successfully',
  SERVICE_CATEGORY_CREATED: 'Service category created successfully',
  SERVICE_CATEGORY_UPDATED: 'Service category updated successfully',
  SERVICE_CATEGORY_DELETED: 'Service category deleted successfully',
  SERVICE_CATEGORY_NOT_FOUND:
    'No service category found for the provided service categoryId',

  CHECKUP_FETCHED: 'Checkup retrieved successfully',
  CHECKUP_CREATED: 'Checkup created successfully',
  CHECKUP_UPDATED: 'Checkup updated successfully',
  CHECKUP_DELETED: 'Checkup deleted successfully',
  CHECKUP_NOT_FOUND: 'No checkup found for the provided checkupId',

  INABILITY_FETCHED: 'Inability retrieved successfully',
  INABILITY_CREATED: 'Inability created successfully',
  INABILITY_UPDATED: 'Inability updated successfully',
  INABILITY_DELETED: 'Inability deleted successfully',
  INABILITY_NOT_FOUND:
    'No inability found for the provided inabilityId',

  PROCEDURES_FETCHED: 'Procedures retrieved successfully',
  PROCEDURES_CREATED: 'Procedures created successfully',
  PROCEDURES_UPDATED: 'Procedures updated successfully',
  PROCEDURES_DELETED: 'Procedures deleted successfully',
  PROCEDURES_NOT_FOUND:
    'No procedures found for the provided proceduresId',
});
