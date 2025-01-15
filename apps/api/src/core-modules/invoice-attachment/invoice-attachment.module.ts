import { Module } from '@nestjs/common';
import { InvoiceAttachmentService } from './invoice-attachment.service';
import { InvoiceAttachmentController } from './invoice-attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceAttachment } from '../all-entities';
import { FileUploadModule } from '../../shared/file_upload/file_upload.module';
import { PatientCasesModule } from '../patient-cases/patient-cases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceAttachment]),
    FileUploadModule,
    PatientCasesModule,
  ],
  controllers: [InvoiceAttachmentController],
  providers: [InvoiceAttachmentService],
  exports: [InvoiceAttachmentService],
})
export class InvoiceAttachmentModule {}
