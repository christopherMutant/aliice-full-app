import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateInvoiceAttachmentDto } from './dto/create-invoice-attachment.dto';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceAttachment } from '../all-entities';
import { Repository } from 'typeorm';
import { FileUploadService } from '../../shared/file_upload/file_upload.service';
import { PatientCasesService } from '../patient-cases/patient-cases.service';
import { ConstantMessage } from '../../constants/constant-messages';
import { InvoiceAttachmentResponseType } from './types/invoice-attachement-response-type';

@Injectable()
export class InvoiceAttachmentService {
  constructor(
    @InjectRepository(InvoiceAttachment)
    private readonly invoiceAttachmentRepository: Repository<InvoiceAttachment>,
    private readonly fileUploadService: FileUploadService,
    private readonly patientCasesService: PatientCasesService,
  ) {}
  async create(
    file: Express.Multer.File,
    createInvoiceAttachmentDto: CreateInvoiceAttachmentDto,
  ): Promise<InvoiceAttachmentResponseType> {
    try {
      const patientCase = await this.patientCasesService.findOne(
        createInvoiceAttachmentDto.patientCase,
      );

      const uploadInvoiceAttachment =
        await this.fileUploadService.invoiceAttachmentUpload(
          file,
          createInvoiceAttachmentDto.name,
        );

      if (uploadInvoiceAttachment) {
        const fileName = this.getRecordFileName(
          uploadInvoiceAttachment.relativeUrl,
        );

        const invoiceAttachment =
          await this.invoiceAttachmentRepository.save({
            name: fileName,
            url: uploadInvoiceAttachment.relativeUrl,
            patientCase,
          });

        return await this.findOne(invoiceAttachment.id);
      }
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOne(id: string): Promise<InvoiceAttachmentResponseType> {
    const invoiceAttachment =
      await this.invoiceAttachmentRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          url: true,
          createdAt: true,
        },
      });

    if (!invoiceAttachment) {
      throw new NotFoundException(
        ConstantMessage.INVOICE_ATTACHMENT_NOT_FOUND,
      );
    }

    return invoiceAttachment;
  }

  async remove(id: string): Promise<void> {
    const invoiceAttachment = await this.findOne(id);

    await this.fileUploadService.deleteFile(invoiceAttachment.url);

    await this.invoiceAttachmentRepository.softRemove(
      invoiceAttachment,
    );
    try {
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  getRecordFileName(fileName: string): string {
    const index = fileName.indexOf('_') + 1;
    return fileName.substring(index);
  }
}
