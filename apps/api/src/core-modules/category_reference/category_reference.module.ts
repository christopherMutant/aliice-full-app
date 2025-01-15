import { Module } from '@nestjs/common';
import { CategoryReferenceService } from './category_reference.service';
import { CategoryReferenceController } from './category_reference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryReference } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryReference])],
  controllers: [CategoryReferenceController],
  providers: [CategoryReferenceService],
})
export class CategoryReferenceModule {}
