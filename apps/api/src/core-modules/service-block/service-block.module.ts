import { forwardRef, Module } from '@nestjs/common';
import { ServiceBlockService } from './service-block.service';
import { ServiceBlockController } from './service-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceBlock } from '../all-entities';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceBlock]),
    forwardRef(() => ServiceModule),
  ],
  controllers: [ServiceBlockController],
  providers: [ServiceBlockService],
  exports: [ServiceBlockService],
})
export class ServiceBlockModule {}
