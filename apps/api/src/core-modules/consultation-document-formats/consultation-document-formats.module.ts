import { Module } from '@nestjs/common';
import { ConsultationDocumentFormatsService } from './consultation-document-formats.service';
import { ConsultationDocumentFormatsController } from './consultation-document-formats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationDocumentFormat } from '../all-entities';
import { FileUploadModule } from '../../shared/file_upload/file_upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultationDocumentFormat]),
    FileUploadModule,
  ],
  controllers: [ConsultationDocumentFormatsController],
  providers: [ConsultationDocumentFormatsService],
  exports: [ConsultationDocumentFormatsService],
})
export class ConsultationDocumentFormatsModule {}
