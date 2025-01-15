import { forwardRef, Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ServiceCategory,
  ServiceCategoryRelation,
} from '../all-entities';
import { ServiceModule } from '../service/service.module';
import { ServiceGroupModule } from '../service-group/service-group.module';
import { ServiceBlockModule } from '../service-block/service-block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategory,
      ServiceCategoryRelation,
    ]),
    forwardRef(() => ServiceModule),
    forwardRef(() => ServiceBlockModule),
    forwardRef(() => ServiceGroupModule),
  ],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
