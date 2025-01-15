import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from './config/env';
import { WinstonModule } from 'nest-winston';
import { ClsModule } from 'nestjs-cls';
import { UserModule } from './core-modules/user/user.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { winstonConfig } from './exception-and-error-handling/logger/winston';
import { SeederModule } from './database/seeders/seeders.module';
import { GlobalExceptionsFilter } from './exception-and-error-handling/global-exception/global-exceptions.filter';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { AuditGlobalSubscriber } from './audit-logs/audit-global-subscriber';
import { AuditLogsService } from './audit-logs/audit-logs.service';
import { DepartmentsModule } from './core-modules/departments/departments.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RoleModule } from './core-modules/role/role.module';
import { PermissionModule } from './core-modules/permission/permission.module';
import { AppointmentModule } from './core-modules/appointment/appointment.module';
import { MedicineModule } from './core-modules/medicine/medicine.module';
import { AppointmentCategoryModule } from './core-modules/appointment-category/appointment-category.module';
import { AppointmentStatusModule } from './core-modules/appointment-status/appointment-status.module';
import { AgendaModule } from './core-modules/agenda/agenda.module';
import { BankDetailsModule } from './core-modules/bank-details/bank-details.module';
import { InsuranceModule } from './core-modules/insurance/insurance.module';
import { ReferenceModule } from './core-modules/reference/reference.module';
import { CategoryReferenceModule } from './core-modules/category_reference/category_reference.module';
import { CategoryPeopleModule } from './core-modules/category_people/category_people.module';
import { CategoryOrganizationModule } from './core-modules/category-organization/category-organization.module';
import { UserAddressModule } from './core-modules/user-address/user-address.module';
import { FileUploadModule } from './shared/file_upload/file_upload.module';
import { CountryModule } from './core-modules/country/country.module';
import { CantonModule } from './core-modules/canton/canton.module';
import { CityModule } from './core-modules/city/city.module';
// import { ConsultationModule } from './core-modules/consultation/consultation.module';
import { ConsultationTitleModule } from './core-modules/consultation-title/consultation-title.module';
import { ConsultationTypeModule } from './core-modules/consultation-type/consultation-type.module';
import { AnalysisModule } from './core-modules/analysis/analysis.module';
import { AnalysisResultsModule } from './core-modules/analysis-results/analysis-results.module';
// import { ConsultationBodyModule } from './core-modules/consultation-body/consultation-body.module';
// import { ConsultationBodyPartEntryModule } from './core-modules/consultation-body-part-entry/consultation-body-part-entry.module';
import { CompanyModule } from './core-modules/company/company.module';
import { PatientCasesModule } from './core-modules/patient-cases/patient-cases.module';
import { DiagnosticModule } from './core-modules/diagnostic/diagnostic.module';
import { InvoiceAttachmentModule } from './core-modules/invoice-attachment/invoice-attachment.module';
import { MedicineBlockModule } from './core-modules/medicine-block/medicine-block.module';
import { MedicineBlockEntriesModule } from './core-modules/medicine-block-entries/medicine-block-entries.module';
import { ConsultationDocumentFormatsModule } from './core-modules/consultation-document-formats/consultation-document-formats.module';
import { LaboratoryRequestModule } from './core-modules/laboratory-request/laboratory-request.module';
import { InvoiceModule } from './core-modules/invoice/invoice.module';
import { DiagnosticCatalogueEntryModule } from './core-modules/diagnostic-catalogue-entry/diagnostic-catalogue-entry.module';
import { AssetModule } from './core-modules/asset/asset.module';
import { MedicalNoteModule } from './core-modules/medical-note/medical-note.module';
import { ServiceModule } from './core-modules/service/service.module';
import { ServiceBlockModule } from './core-modules/service-block/service-block.module';
import { ServiceGroupModule } from './core-modules/service-group/service-group.module';
import { ServiceCategoryModule } from './core-modules/service-category/service-category.module';
import { CheckupModule } from './core-modules/checkup/checkup.module';
import { InabilityModule } from './core-modules/inability/inability.module';
import { ProceduresModule } from './core-modules/procedures/procedures.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    TypeOrmModule.forRoot(ENV.DB_CONFIGURATION),
    WinstonModule.forRoot(winstonConfig),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    SeederModule,
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule,
    DepartmentsModule,
    HealthModule,
    AppointmentModule,
    AppointmentCategoryModule,
    AppointmentStatusModule,
    AgendaModule,
    MedicineModule,
    BankDetailsModule,
    InsuranceModule,
    ReferenceModule,
    CategoryReferenceModule,
    CategoryPeopleModule,
    CategoryOrganizationModule,
    UserAddressModule,
    FileUploadModule,
    CountryModule,
    CantonModule,
    CityModule,
    ConsultationTitleModule,
    ConsultationTypeModule,
    CompanyModule,
    // ConsultationModule,
    // ConsultationBodyModule,
    // ConsultationBodyPartEntryModule,
    AnalysisModule,
    AnalysisResultsModule,
    PatientCasesModule,
    DiagnosticModule,
    DiagnosticCatalogueEntryModule,
    InvoiceAttachmentModule,
    MedicineBlockModule,
    MedicineBlockEntriesModule,
    ConsultationDocumentFormatsModule,
    LaboratoryRequestModule,
    InvoiceModule,
    AssetModule,
    MedicalNoteModule,
    ServiceModule,
    ServiceBlockModule,
    ServiceGroupModule,
    ServiceCategoryModule,
    CheckupModule,
    InabilityModule,
    ProceduresModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    AuditGlobalSubscriber,
    AuditLogsService,
  ],
})
export class AppModule {}
