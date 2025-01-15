import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateConsultationDocumentFormatDto } from './dto/create-consultation-document-format.dto';
import { UpdateConsultationDocumentFormatDto } from './dto/update-consultation-document-format.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationDocumentFormat } from '../all-entities';
import { Repository } from 'typeorm';
import { FileUploadService } from '../../shared/file_upload/file_upload.service';
import { GlobalHelper } from '../../config/app-global-helper';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConsultationDocumentFormatResponseType } from './types/consultation-document-format-response.type';

@Injectable()
export class ConsultationDocumentFormatsService {
  constructor(
    @InjectRepository(ConsultationDocumentFormat)
    private readonly consultationDocumentFormatRepository: Repository<ConsultationDocumentFormat>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async create(
    file: Express.Multer.File,
    createConsultationDocumentFormatDto: CreateConsultationDocumentFormatDto,
  ): Promise<ConsultationDocumentFormatResponseType> {
    try {
      const uploadConsultationDocument =
        await this.fileUploadService.consultationDocumentFormatUpload(
          file,
          createConsultationDocumentFormatDto.name,
        );

      if (uploadConsultationDocument) {
        const fileName = GlobalHelper.getRecordFileName(
          uploadConsultationDocument.relativeUrl,
        );

        const consultationDocument =
          await this.consultationDocumentFormatRepository.save({
            ...createConsultationDocumentFormatDto,
            name: fileName,
            url: uploadConsultationDocument.relativeUrl,
            type: GlobalHelper.getFileType(
              uploadConsultationDocument.relativeUrl,
            ),
          });

        return await this.findOne(consultationDocument.id);
      }
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(): Promise<ConsultationDocumentFormatResponseType[]> {
    const consultationDocuments =
      await this.consultationDocumentFormatRepository.find({
        select: {
          id: true,
          name: true,
          url: true,
          type: true,
          category: true,
          address: true,
          dataSensitivity: true,
          description: true,
          createdAt: true,
        },
      });

    return consultationDocuments;
  }

  async findOne(
    id: string,
  ): Promise<ConsultationDocumentFormatResponseType> {
    const consultationDocument =
      await this.consultationDocumentFormatRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          url: true,
          type: true,
          category: true,
          address: true,
          dataSensitivity: true,
          description: true,
          createdAt: true,
        },
      });

    if (!consultationDocument) {
      throw new NotFoundException();
    }

    return consultationDocument;
  }

  //only updates the entry in database
  async update(
    id: string,
    updateConsultationDocumentFormatDto: UpdateConsultationDocumentFormatDto,
  ): Promise<void> {
    const consultationDocument = await this.findOne(id);

    try {
      await this.consultationDocumentFormatRepository.save({
        ...consultationDocument,
        ...updateConsultationDocumentFormatDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const consultationDocument = await this.findOne(id);

    try {
      await this.fileUploadService.deleteFile(
        consultationDocument.url,
      );

      await this.consultationDocumentFormatRepository.softRemove(
        consultationDocument,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
