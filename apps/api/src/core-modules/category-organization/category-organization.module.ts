import { Module } from '@nestjs/common';
import { CategoryOrganizationService } from './category-organization.service';
import { CategoryOrganizationController } from './category-organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrganization } from '../all-entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrganization])],
  controllers: [CategoryOrganizationController],
  providers: [CategoryOrganizationService],
})
export class CategoryOrganizationModule {}
