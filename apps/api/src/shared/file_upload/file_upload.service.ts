import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';
import { AppErrorMessages } from '../../constants/app-error-messages';
import {
  BucketService,
  S3ObjectsType,
} from '../bucket/bucket.service';
import { IUploadFile } from '../interfaces/file-upload.interface';

@Injectable()
export class FileUploadService {
  constructor(private readonly bucketService: BucketService) {}
  async iconsUploadZip(zipFile: Express.Multer.File): Promise<void> {
    const allowedTypes = ['application/zip'];

    if (!allowedTypes.includes(zipFile.mimetype)) {
      throw new BadRequestException(
        `'Only these mime types are allowed: ${allowedTypes.join(
          ', ',
        )}'`,
      );
    }

    // Get the base directory of your project
    const baseDir = path.join(__dirname, '..');
    // Define the directory where you want to save the file
    const uploadDir = path.join(baseDir, 'uploads');
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // Generate a unique filename for the uploaded file
    const fileName = `${Date.now()}-${zipFile.originalname}`;

    // Save the file to disk
    const filePath: string = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filePath, zipFile.buffer);
    try {
      await this.bucketService.iconUploadZip(filePath);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.bucket_storage_error,
      );
    }
  }

  async findAllIcons(): Promise<S3ObjectsType[]> {
    return await this.bucketService.BucketObjectList('icons');
  }

  async invoiceAttachmentUpload(
    file: Express.Multer.File,
    name: string,
  ): Promise<IUploadFile> {
    const allowedTypes = [
      'application/pdf', //pdf
      'application/msword', //doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
      'image/png', //png
      'image/jpeg', //jpeg
      'image/webp', //webp
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `'Only these mime types are allowed: ${allowedTypes.join(
          ', ',
        )}'`,
      );
    }

    return await this.uploadFile(file, name, 'invoice-attachments');
  }

  async consultationDocumentFormatUpload(
    file: Express.Multer.File,
    name: string,
  ): Promise<IUploadFile> {
    const allowedTypes = [
      'application/pdf', //pdf
      'application/msword', //doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
      'image/png', //png
      'image/jpeg', //jpeg
      'image/webp', //webp
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `'Only these mime types are allowed: ${allowedTypes.join(
          ', ',
        )}'`,
      );
    }

    return await this.uploadFile(
      file,
      name,
      'consultation-document-format',
    );
  }

  async uploadFile(
    file: Express.Multer.File,
    name: string,
    folderName: string,
  ): Promise<IUploadFile> {
    // Get the base directory of your project
    const baseDir = path.join(__dirname, '..');
    // Define the directory where you want to save the file
    const uploadDir = path.join(baseDir, 'uploads');
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // Generate a unique filename for the uploaded file
    const fileName = `${Date.now()}-${file.originalname}`;

    // Save the file to disk
    const filePath: string = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filePath, file.buffer);
    try {
      const saveFile = await this.bucketService.uploadDocument(
        file.buffer,
        file.mimetype,
        name,
        folderName,
      );

      return saveFile;
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.bucket_storage_error,
      );
    }
  }

  //deletes any file in bucket, url is expected to be relative url (ex: foldername/filename.txt)
  async deleteFile(url: string): Promise<void> {
    const backSlashIndex = url.indexOf('/');
    const fileKey = url.substring(backSlashIndex + 1); //filename in bucket
    const folderName = url.slice(0, backSlashIndex); // foldername in bucket

    const fileDelete = await this.bucketService.deleteFile(
      fileKey,
      folderName,
    );

    if (fileDelete) {
      return;
    }

    throw new NotImplementedException(
      AppErrorMessages.bucket_storage_error,
    );
  }

  async createDocumentConsultationFile(
    url: string,
  ): Promise<IUploadFile> {
    return await this.bucketService.createDocumentConsultationFile(
      url,
    );
  }
}
