import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as AWS from 'aws-sdk';
import { IUploadFile } from '../interfaces/file-upload.interface';
import { ENV } from '../../config/env';
import * as _ from 'lodash';
import * as path from 'path';
import * as unzip from 'unzipper';
import { AppErrorMessages } from '../../constants/app-error-messages';

export class S3ObjectsType {
  Key: string;
  url: string;
}

interface ExtractedFile {
  path: string;
  buffer: () => Promise<Buffer>;
}
@Injectable()
export class BucketService {
  s3: AWS.S3;

  constructor() {
    const endpoint = ENV.BUCKET_HOST;

    const s3Config = endpoint
      ? {
          accessKeyId: ENV.BUCKET_USER,
          secretAccessKey: ENV.BUCKET_PASSWORD,
          endpoint,
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        }
      : {
          // accessKeyId: ENV.AWS_KEY_ID,
          // secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
          // region: ENV.AWS_REGION,
        };
    this.s3 = new AWS.S3(s3Config);
  }

  slugify(fileName: string | null | undefined): string {
    if (!fileName) {
      const bytes = crypto.randomBytes(64 / 2);
      return bytes.toString('hex');
    }

    return fileName
      .trim()
      .replace(/ +/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');
  }

  async uploadFile(
    buffer: unknown,
    mimetype: string,
    originalName: string,
    folderName: string,
  ): Promise<IUploadFile> {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];

    if (!allowedTypes.includes(mimetype)) {
      throw new BadRequestException(
        `Only these mime types are allowed: ${allowedTypes.join(
          ', ',
        )}`,
      );
    }

    const fileKey =
      `${new Date().getTime()}_${this.slugify(originalName)}.` +
      mimetype.split('/')[1];

    const relativeUrl = `${folderName}/${fileKey}`;
    const uploaded = await this.s3
      .upload({
        Bucket: ENV.BUCKET_NAME,
        Key: relativeUrl,
        Body: buffer,
        ContentType: mimetype,
      })
      .promise();

    return { relativeUrl, fullUrl: uploaded.Location };
  }

  async deleteFile(
    fileKey: string,
    folderName: string,
  ): Promise<boolean> {
    await this.s3
      .deleteObject({
        Bucket: ENV.BUCKET_NAME,
        Key: `${folderName}/${fileKey}`,
      })
      .promise();
    return true;
  }

  async BucketObjectList(prefix: string): Promise<S3ObjectsType[]> {
    const data = await this.s3
      .listObjects({
        Bucket: ENV.BUCKET_NAME,
        Prefix: `${prefix}`,
      })
      .promise();

    const result = data.Contents.map(data => {
      return {
        Key: data.Key.substring(prefix.length + 1),
        url: ENV.BUCKET_HOST + '/' + ENV.BUCKET_NAME + '/' + data.Key,
      };
    });
    return result;
  }

  async iconUploadZip(zipFilePath: string): Promise<void> {
    const extracted = await unzip.Open.file(zipFilePath);
    const chunks = _.chunk(extracted.files as ExtractedFile[], 50);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (extractedFile: ExtractedFile) => {
          const buffer = await extractedFile.buffer();
          const fileKey = extractedFile.path.replace(
            `Uploaded file name`,
            `icons`,
          );

          if (
            !(
              fileKey.includes('__MACOSX') ||
              fileKey.includes('.DS_STORE')
            )
          ) {
            const fileExtension = fileKey.substring(
              fileKey.lastIndexOf('.'),
            );
            const fileName =
              this.slugify(
                fileKey.substring(0, fileKey.lastIndexOf('.') - 1),
              ) + fileExtension;

            await this.s3
              .upload({
                Bucket: ENV.BUCKET_NAME,
                Key: 'icons/' + fileName,
                Body: buffer,
                ContentType: `image/${path
                  .parse(extractedFile.path)
                  .ext.replace('.', '')}`,
              })
              .promise();
          }
        }),
      );
    }
  }

  async uploadDocument(
    buffer: unknown,
    mimetype: string,
    originalName: string,
    folderName: string,
  ): Promise<IUploadFile> {
    const allowedTypes = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'docx',
      'image/png': 'png',
      'image/jpeg': 'jpeg',
      'image/webp': 'webp',
    };

    if (!Object.keys(allowedTypes).includes(mimetype)) {
      throw new BadRequestException(
        `Only these mime types are allowed: ${Object.keys(
          allowedTypes,
        ).join(', ')}`,
      );
    }

    const fileKey = `${new Date().getTime()}_${this.slugify(
      originalName,
    )}.${allowedTypes[mimetype]}`;

    const relativeUrl = `${folderName}/${fileKey}`;

    try {
      const uploaded = await this.s3
        .upload({
          Bucket: ENV.BUCKET_NAME,
          Key: relativeUrl,
          Body: buffer,
          ContentType: mimetype,
        })
        .promise();

      return { relativeUrl, fullUrl: uploaded.Location };
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.bucket_storage_error,
      );
    }
  }

  async createDocumentConsultationFile(
    fileKey: string,
  ): Promise<IUploadFile> {
    try {
      const originalFile = await this.s3
        .getObject({
          Bucket: ENV.BUCKET_NAME,
          Key: fileKey,
        })
        .promise();

      const originalFileName = fileKey.substring(
        fileKey.indexOf('_') + 1,
      );

      const newFileName = `${new Date().getTime()}_${originalFileName}`;
      const folderName = 'document-consultation-files';
      const relativeUrl = `${folderName}/${newFileName}`;

      const uploadNewFile = await this.s3
        .upload({
          Bucket: ENV.BUCKET_NAME,
          Key: relativeUrl,
          Body: originalFile.Body,
          ContentType: originalFile.ContentType,
        })
        .promise();

      return { relativeUrl, fullUrl: uploadNewFile.Location };
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.bucket_storage_error,
      );
    }
  }
}
