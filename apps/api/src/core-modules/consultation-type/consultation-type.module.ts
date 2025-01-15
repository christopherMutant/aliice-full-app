import { Module } from '@nestjs/common';
import { ConsultationTypeService } from './consultation-type.service';
import { ConsultationTypeController } from './consultation-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationType } from './entities/consultation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultationType])],
  controllers: [ConsultationTypeController],
  providers: [ConsultationTypeService],
  exports: [ConsultationTypeService],
})
export class ConsultationTypeModule {}
