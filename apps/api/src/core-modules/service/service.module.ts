import { forwardRef, Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../all-entities';
import { ServiceBlockModule } from '../service-block/service-block.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    forwardRef(() => ServiceBlockModule),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
