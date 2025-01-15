export enum RefRoleKeys {
  SUPER_ADMIN = 'super_admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  NURSE = 'nurse',
  ACCOUNTANT = 'accountant',
  RECEPTIONIST = 'receptionist',
  FRONT_DESK = 'front_desk',
}

export enum OrderSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum VerificationCodeTypes {
  FORGOT_PASSWORD = 'forgotten_password',
  SIGNUP = 'signup',
}

export enum UserUniqueIdPrefix {
  ADMIN = 'ADM',
  PATIENT = 'PAT',
  DOCTOR = 'DOC',
  NURSE = 'NUR',
  ACCOUNTANT = 'ACC',
  RECEPTIONIST = 'REC',
  PERSON = 'PER',
  FRONT_DESK = 'FRO',
}

export enum DefaultAppointmentStatus {
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export enum apppointmentOrderByStatement {
  PATIENT = 'patients.firstName',
  DOCTOR = 'doctors.firstName',
  DEPARTMENT = 'departments.name',
  STATUS = 'appointment_status.name',
  DESCRIPTION = 'appointments.descrition',
  APPOINTMENTSTART = 'appointments.appointmentStart',
  CATEGORY = 'appointment_categories.name',
  TITLE = 'about_appointments.title',
}

export enum AgendaTypes {
  USER = 'user',
  CLIENT = 'client',
  RESOURCES = 'resources',
}

export enum AppointmentIntervalUnits {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export enum RruleFreq {
  DAYS = 'DAILY',
  WEEKS = 'WEEKLY',
  MONTHS = 'MONTHLY',
  YEARS = 'YEARLY',
}

export enum FamilyCategory {
  PARENT = 'parent',
  CHILD = 'child',
  SIBLINGS = 'siblings',
  GRANDPARENTS = 'grandparents',
  GRANDCHILD = 'grandchild',
  COUSINS = 'cousins',
  UNCLE_OR_AUNT = 'uncle or aunt',
  NEPHEW_OR_NIECE = 'nephew or niece',
  PARNER = 'partner',
  OTHER = 'other family relationships',
}

export enum FamilialRelationship {
  BIOLOGICAL = 'biological',
  MARRIAGE_OR_ADOPTIVE = 'marriage or adoptive',
  MATERNAL = 'maternal',
  PATERNAL = 'paternal',
  NO_INFORMATION = 'no information',
  PATERNAL_AND_MATERNAL = 'paternal and maternal',
  SPOUSE = 'spouse',
  LIFE_PARTNER = 'life partner',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  INDEFINITE = 'indefinite',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum CorrespondenceLanguage {
  FRENCH = 'french',
  GERMAN = 'german',
  ITALIAN = 'italian',
  ENGLISH = 'english',
}

export enum Communication {
  LETTER = 'letter',
  EMAIL = 'email',
  AS_PRESENT = 'as present',
}

export enum Countries {
  SWITZERLAND = 'Switzerland',
  LICHTENSTEIN = 'Lichtenstein',
}

export enum ContactCategories {
  PRIVATE = 'private',
  GENERAL = 'general',
}

export enum ContanctCategoriesCompany {
  SUPPLIER = 'Supplier',
  ASS_MILITARY = 'Ass military',
  ASS_SOCIAL = 'Ass social',
  HEALTH_INSURNACE = 'Health insurance',
  ASS_ACCIDENT = 'Ass accident',
}

export enum CompanyType {
  INSURANCE = 'insurance',
  ORGANIZATION = 'organization',
  MEDICAL_CENTER = 'medical center',
}

export enum AssuranceType {
  ASSURANCE_LAMAL = 'Assurance LaMal',
  ASSURANCE_LCA = 'Assurance LCA',
  ASSURANCE_LAMAL_AND_LCA = 'Assurance LaMal And LCA',
  ASSURANCE_LAA = 'Assurance LAA',
  ASSURANCE_LAM = 'Assurance LAM',
  ASSURANCE_LAI = 'Assurance LAI',
}

export enum HealthInsuranceModel {
  Unknown = 'unknown',
  NoSelection = 'No Selection',
  NoBasicInsurance = 'No Basic Insurance',
  StandardModelLAMal = 'Standard Model According To LAMal',
  HMOLAMal = 'HMO According To LaMal',
  ModelListLAMal = 'Model Lists According To LaMal',
  PhoneModelLAMal = 'Phone Model According To LaMal',
  PharmacyModelLAMal = 'Pharmacy Model According To LaMal',
  SpecialModelLAMal = 'Special Model According to LaMal',
}

export enum AnalysisCategories {
  BIOMETRIC = 'biometric',
  LABORATORY = 'laboratory',
}

export enum ConsultationBodyTypes {
  TEXT = 'Text',
  MEDICINE = 'Medicine',
  DOCUMENT = 'Document',
  ANALYSIS = 'Analysis',
  INABILITY = 'Inability',
  SERVICE = 'Service',
}
export enum ConsultationEntryTypes {
  MEDICINE = 'Medicine',
  DOCUMENT = 'Document',
  ANALYSIS = 'Analysis',
  INABILITY = 'Inability',
  SERVICE = 'Service',
}

export enum MedicineTypes {
  MEDICINE = 'medicine',
  CONSUMABLES = 'consumables',
  VACCINE = 'vaccine',
}

export enum OpenClosedStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum DocumentCategories {
  NO_CATEGORY = 'No category',
  TAGESBLATT_INFUSION = 'Tagesblatt Infusion',
  INVESTIGATIONS = 'Investigations',
  TRANSFERS = 'Transfers',
  ALL = 'All',
  DRIVERS = 'Drivers',
  LETTER_TO_THE_PATIENT = ' Letter to the Patient',
  INSURANCE_LETTER = 'Insurance Letter',
  TWO = 'Two',
  RX = 'RX',
  PHOTOS = 'Photos',
}

export enum DataSensitivityTypes {
  NON_SENSITIVE = 'non-sensitive data',
  SENSITIVE = 'sensitive data',
  HIGHLY_SENSITIVE = 'highly sensitive data',
}

export enum LawCategories {
  PRIVATE = 'Private',
  LAMAL = 'LAMal',
  LCA = 'LCA',
  LAA = 'LAA',
  LAM = 'LAM',
  LET = 'LET',
}

export enum CaseDifferentiations {
  NO_SELECTION = 'no selection',
}

export enum ReasonsForProcessingCase {
  DISEASE = 'disease',
  ACCIDENT = 'accident',
  PREVENTION = 'prevention',
  MATERNITY = 'maternity',
  CONGENITAL_DEFECT = 'congenital defect',
}

export enum PlacesOfDispensation {
  CABINET = 'cabinet',
  HOSPITAL = 'hospital',
}

export enum RefundTypes {
  TG = 'TG',
  TP = 'TP',
  PRIVATE = 'private',
}

export enum RecepientTypes {
  PATIENT = 'patient',
  LEGAL_REPRESENTATIVE = 'legal representative',
}

export enum DueDateForBillingTypes {
  FREE = 'free',
  ACCORDING_TO_CLOSURE = 'according to closure',
  ACCORDING_TO_DEFINED_BILLING_PERIOD = 'according to defined billing period',
  BLOCKED = 'blocked',
}

export enum ServiceProviders {
  DEPENDING_ON_THE_SETTINGS = 'depending on the settings',
  FIXED_MANDATE = 'fixed mandate',
}

export enum TarmedPointValueAndPersonalCatalogsTypes {
  DEPENDING_ON_THE_SETTINGS = 'depending on the settings',
  FIXED_IN_CASE = 'fixed in case',
}

export enum PatientCaseStatus {
  CONSULTATION = 'consultation',
  PROCEDURE = 'procedure',
  FOLLOW_UP = 'follow up',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum PatientCaseSource {
  SOCIAL_MEDIA = 'social_media',
  GOOGLE = 'google',
  WALK_IN = 'walk in',
}

export enum InvoiceStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum DefaultDiagnosticCatalogues {
  TEXT = 'Text',
  TARMED = 'Tarmed',
}

export enum MedicalNoteTypes {
  AP = 'AP',
  OF = 'OF',
  NOTES = 'notes',
}

export enum VatTypes {
  NORMAL_VAT = 'normal',
  EXEMPTED_VAT = 'exempted',
  REDUCED_VAT = 'reduced',
}

export enum VatTypeValues {
  NORMAL_VAT = 8.1,
  EXEMPTED_VAT = 0,
  REDUCED_VAT = 2.6,
}

export enum ServiceCatalogue {
  TARMED = 'tarmed',
  ARTICLE = 'article',
  BLOCK = 'block',
  CUSTOM = 'custom',
}

export enum ServiceGroupTypes {
  SERVICE = 'service',
  BLOCK = 'block',
}

export enum DiscountCategories {
  AND = 'AND',
}

export enum CompulsoryInsuranceTypes {
  P = 'private',
}

export enum ServicGroupRelationTypes {
  SERVICE = 'service',
  SERVICE_BLOCK = 'service block',
}

export enum ServiceCategoryTypes {
  SERVICE = 'service',
  BLOCK = 'block',
  GROUP = 'group',
}

export enum ServiceCategoryRelationTypes {
  SERVICE = 'service',
  SERVICE_BLOCK = 'service block',
  SERVICE_GROUP = 'service group',
}

export enum CheckUpTypes {
  CONSULTATION = 'consultation',
  FOLLOW_UP_CHECKUP = 'follow up checkup',
}

export enum ServiceStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PatientCaseServiceTypes {
  CHECKUP = 'checkup',
  PROCEDURES = 'procedures',
}
