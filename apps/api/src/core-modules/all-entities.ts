import { User } from './user/entities/user.entity';
import { SeedRevision } from '../database/entities/seed-revision.entity';
import { RefRole } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { UserRole } from './role/entities/user-role.entity';
import { Department } from './departments/entities/department.entity';
import { EmailLog } from '../database/entities/email-log.entity';
import { Appointment } from './appointment/entities/appointment.entity';
import { Medicine } from './medicine/entities/medicine.entity';
import { AppointmentCategory } from './appointment-category/entities/appointment-category.entity';
import { AppointmentStatus } from './appointment-status/entities/appointment-status.entity';
import { Agenda } from './agenda/entities/agenda.entity';
import { AboutAppointment } from './appointment/entities/about_appointment.entity';
import { BankDetails } from './bank-details/entities/bank-detail.entity';
import { Family } from './user/entities/family.entity';
import { Insurance } from './insurance/entities/insurance.entity';
import { Reference } from './reference/entities/reference.entity';
import { CategoryReference } from './category_reference/entities/category_reference.entity';
import { UserAddress } from './user-address/entities/user-address.entity';
import { AppointmentOccurrence } from './appointment/entities/appointment_occurrence.entity';
import { CategoryPeople } from './category_people/entities/category_person.entity';
import { CategoryOrganization } from './category-organization/entities/category-organization.entity';
import { Country } from './country/entities/country.entity';
import { Canton } from './canton/entities/canton.entity';
import { City } from './city/entities/city.entity';
import { Consultation } from './consultation/entities/consultation.entity';
import { ConsultationType } from './consultation-type/entities/consultation-type.entity';
import { ConsultationTitle } from './consultation-title/entities/consultation-title.entity';
import { Analysis } from './analysis/entities/analysis.entity';
import { MedicineConsultation } from './consultation-body/entities/medicine-consultation-type.entity';
import { ConsultationBody } from './consultation-body/entities/consultation-body.entity';
import { DocumentConsultation } from './consultation-body/entities/document-consultation-type.entity';
import { TextConsultation } from './consultation-body/entities/text-consultation-type.entity';
// import { InabilityConsultation } from './consultation-body/entities/inability-consultation-type.entity';
import { ServiceConsultation } from './consultation-body/entities/service-consultation-type.entity';
import { DocumentConsultationEntry } from './consultation-body-part-entry/entities/document-consultation-entry.entity';
import { MedicineConsultationEntry } from './consultation-body-part-entry/entities/medicine-consultation-entry.entity';
import { ServiceConsultationEntry } from './consultation-body-part-entry/entities/service-consultation-entry.entity';
// import { InabilityConsultationEntry } from './consultation-body-part-entry/entities/inability-consultation-entry.entity';
import { AnalysisResult } from './analysis-results/entities/analysis-result.entity';
import { AnalysisConsultation } from './consultation-body/entities/analysis-consultation-type.entity';
import { Company } from './company/entities/company.entity';
import { PatientCase } from './patient-cases/entities/patient-case.entity';
import { Diagnostic } from './diagnostic/entities/diagnostic.entity';
import { DiagnosticCatalogue } from './diagnostic-catalogue-entry/entities/diagnostic-catalogue.entity';
import { DiagnosticCatalogueEntry } from './diagnostic-catalogue-entry/entities/diagnostic-catalogue-entry.entity';
import { InvoiceAttachment } from './invoice-attachment/entities/invoice-attachment.entity';
import { MedicineBlock } from './medicine-block/entities/medicine-block.entity';
import { MedicineBlockEntry } from './medicine-block-entries/entities/medicine-block-entry.entity';
import { LaboratoryRequest } from './laboratory-request/entities/laboratory-request.entity';
import { ConsultationDocumentFormat } from './consultation-document-formats/entities/consultation-document-format.entity';
import { Invoice } from './invoice/entities/invoice.entity';
import { Asset } from './asset/entities/asset.entity';
import { MedicalNote } from './medical-note/entities/medical-note.entity';
import { MedicalNoteAp } from './medical-note/entities/medical-note-ap.entity';
import { MedicalNoteOf } from './medical-note/entities/medical-note-of.entity';
import { MedicalNoteNotes } from './medical-note/entities/medical-note-notes.entity';
import { MedicalNoteHistory } from './medical-note/entities/medical-note-history.entity';
import { MedicalNoteHistoryRelation } from './medical-note/entities/medical-note-history-relation.entity';
import { Service } from './service/entities/service.entity';
import { ServiceBlock } from './service-block/entities/service-block.entity';
import { ServiceGroup } from './service-group/entities/service-group.entity';
import { ServiceGroupRelation } from './service-group/entities/service-group-relation.entity';
import { ServiceCategory } from './service-category/entities/service-category.entity';
import { ServiceCategoryRelation } from './service-category/entities/service-category-relation.entity';
import { Checkup } from './checkup/entities/checkup.entity';
import { Inability } from './inability/entities/inability.entity';
import { PatientCaseService } from './patient-cases/entities/patient-case-service.entity';
import { Procedure } from './procedures/entities/procedure.entity';
import { ProcedureItem } from './procedures/entities/procedure-item.entity';

export const AllEntities = {
  RefRole: RefRole,
  Medicine: Medicine,
  BankDetails: BankDetails,
  Family: Family,
  Insurance: Insurance,
  Reference: Reference,
  SeedRevision: SeedRevision,
  EmailLog: EmailLog,
  Permission: Permission,
  Department: Department,
  User: User,
  CategoryReference: CategoryReference,
  UserAddress: UserAddress,
  UserRole: UserRole,
  Agenda: Agenda,
  Appointment: Appointment,
  AboutAppointment: AboutAppointment,
  AppointmentCategory: AppointmentCategory,
  AppointmentStatus: AppointmentStatus,
  AppointmentOccurrence: AppointmentOccurrence,
  CategoryPeople: CategoryPeople,
  CategoryOrganization: CategoryOrganization,
  Country: Country,
  Canton: Canton,
  City: City,
  Consultation: Consultation,
  ConsultationTitle: ConsultationTitle,
  ConsultationType: ConsultationType,
  Company: Company,
  ConsultationBody: ConsultationBody,
  TextConsultation: TextConsultation,
  MedicineConsultation: MedicineConsultation,
  MedicineConsultationEntry: MedicineConsultationEntry,
  DocumentConsultation: DocumentConsultation,
  DocumentConsultationEntry: DocumentConsultationEntry,
  // InabilityConsultation: InabilityConsultation,
  // InabilityConsultationEntry: InabilityConsultationEntry,
  ServiceConsultation: ServiceConsultation,
  ServiceConsultationEntry: ServiceConsultationEntry,
  Analysis: Analysis,
  AnalysisResult: AnalysisResult,
  AnalysisConsultation: AnalysisConsultation,
  PatientCase: PatientCase,
  Diagnostic: Diagnostic,
  DiagnosticCatalogue: DiagnosticCatalogue,
  DiagnosticCatalogueEntry: DiagnosticCatalogueEntry,
  InvoiceAttachment: InvoiceAttachment,
  MedicineBlock: MedicineBlock,
  MedicineBlockEntry: MedicineBlockEntry,
  LaboratoryRequest: LaboratoryRequest,
  ConsultationDocumentFormat: ConsultationDocumentFormat,
  Invoice: Invoice,
  Asset: Asset,
  MedicalNote: MedicalNote,
  MedicalNoteAp: MedicalNoteAp,
  MedicalNoteOf: MedicalNoteOf,
  MedicalNoteNotes: MedicalNoteNotes,
  MedicalNoteHistory: MedicalNoteHistory,
  MedicalNoteHistoryRelation: MedicalNoteHistoryRelation,
  Service: Service,
  ServiceGroup: ServiceGroup,
  ServiceGroupRelation: ServiceGroupRelation,
  ServiceBlock: ServiceBlock,
  ServiceCategory: ServiceCategory,
  ServiceCategoryRelation: ServiceCategoryRelation,
  Checkup: Checkup,
  Inability: Inability,
  PatientCaseService: PatientCaseService,
  Procedure: Procedure,
  ProcedureItem: ProcedureItem,
};

export {
  RefRole,
  Medicine,
  BankDetails,
  Family,
  Insurance,
  Reference,
  EmailLog,
  Permission,
  Department,
  UserRole,
  User,
  CategoryReference,
  UserAddress,
  SeedRevision,
  Agenda,
  Appointment,
  AboutAppointment,
  AppointmentCategory,
  AppointmentStatus,
  AppointmentOccurrence,
  CategoryPeople,
  CategoryOrganization,
  Country,
  Canton,
  City,
  Consultation,
  ConsultationType,
  ConsultationTitle,
  Company,
  ConsultationBody,
  TextConsultation,
  MedicineConsultation,
  MedicineConsultationEntry,
  DocumentConsultation,
  DocumentConsultationEntry,
  // InabilityConsultation,
  // InabilityConsultationEntry,
  ServiceConsultation,
  ServiceConsultationEntry,
  Analysis,
  AnalysisResult,
  AnalysisConsultation,
  PatientCase,
  Diagnostic,
  DiagnosticCatalogue,
  DiagnosticCatalogueEntry,
  InvoiceAttachment,
  MedicineBlock,
  MedicineBlockEntry,
  LaboratoryRequest,
  ConsultationDocumentFormat,
  Invoice,
  Asset,
  MedicalNote,
  MedicalNoteAp,
  MedicalNoteOf,
  MedicalNoteNotes,
  MedicalNoteHistory,
  MedicalNoteHistoryRelation,
  Service,
  ServiceGroup,
  ServiceGroupRelation,
  ServiceBlock,
  ServiceCategory,
  ServiceCategoryRelation,
  Checkup,
  Inability,
  PatientCaseService,
  Procedure,
  ProcedureItem,
};
