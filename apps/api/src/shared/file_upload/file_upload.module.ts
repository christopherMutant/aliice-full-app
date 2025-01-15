import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileUploadController } from './file_upload.controller';
import { BucketService } from '../bucket/bucket.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, BucketService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
