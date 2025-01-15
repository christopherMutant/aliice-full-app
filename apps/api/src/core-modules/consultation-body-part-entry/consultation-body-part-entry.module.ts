// import { forwardRef, Module } from '@nestjs/common';
// import { ConsultationBodyPartEntryService } from './consultation-body-part-entry.service';
// import { ConsultationBodyPartEntryController } from './consultation-body-part-entry.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import {
//   DocumentConsultationEntry,
//   InabilityConsultationEntry,
//   MedicineConsultationEntry,
//   ServiceConsultationEntry,
// } from '../all-entities';
// import { ConsultationBodyModule } from '../consultation-body/consultation-body.module';
// import { MedicineModule } from '../medicine/medicine.module';
// import { AnalysisResultsModule } from '../analysis-results/analysis-results.module';
// import { ConsultationDocumentFormatsModule } from '../consultation-document-formats/consultation-document-formats.module';
// import { FileUploadModule } from '../../shared/file_upload/file_upload.module';
// import { ServiceModule } from '../service/service.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       DocumentConsultationEntry,
//       MedicineConsultationEntry,
//       InabilityConsultationEntry,
//       ServiceConsultationEntry,
//     ]),
//     MedicineModule,
//     forwardRef(() => AnalysisResultsModule),
//     forwardRef(() => ConsultationBodyModule),
//     ConsultationDocumentFormatsModule,
//     FileUploadModule,
//     ServiceModule,
//   ],
//   controllers: [ConsultationBodyPartEntryController],
//   providers: [ConsultationBodyPartEntryService],
//   exports: [ConsultationBodyPartEntryService],
// })
// export class ConsultationBodyPartEntryModule {}
