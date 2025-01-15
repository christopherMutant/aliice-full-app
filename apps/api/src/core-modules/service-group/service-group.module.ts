import { forwardRef, Module } from '@nestjs/common';
import { ServiceGroupService } from './service-group.service';
import { ServiceGroupController } from './service-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceGroup, ServiceGroupRelation } from '../all-entities';
import { ServiceModule } from '../service/service.module';
import { ServiceBlockModule } from '../service-block/service-block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceGroup, ServiceGroupRelation]),
    forwardRef(() => ServiceModule),
    forwardRef(() => ServiceBlockModule),
  ],
  controllers: [ServiceGroupController],
  providers: [ServiceGroupService],
  exports: [ServiceGroupService],
})
export class ServiceGroupModule {}
