// import { forwardRef, Module } from '@nestjs/common';
// import { ConsultationBodyService } from './consultation-body.service';
// import { ConsultationBodyController } from './consultation-body.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import {
//   AnalysisConsultation,
//   ConsultationBody,
//   DocumentConsultation,
//   InabilityConsultation,
//   MedicineConsultation,
//   ServiceConsultation,
//   TextConsultation,
// } from '../all-entities';
// import { ConsultationModule } from '../consultation/consultation.module';
// import { ConsultationTitleModule } from '../consultation-title/consultation-title.module';
// import { ConsultationBodyPartEntryModule } from '../consultation-body-part-entry/consultation-body-part-entry.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       ConsultationBody,
//       TextConsultation,
//       DocumentConsultation,
//       MedicineConsultation,
//       InabilityConsultation,
//       ServiceConsultation,
//       AnalysisConsultation,
//     ]),
//     ConsultationTitleModule,
//     forwardRef(() => ConsultationModule),
//     forwardRef(() => ConsultationBodyPartEntryModule),
//   ],
//   controllers: [ConsultationBodyController],
//   providers: [ConsultationBodyService],
//   exports: [ConsultationBodyService],
// })
// export class ConsultationBodyModule {}
