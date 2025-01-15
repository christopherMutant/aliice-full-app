import { Module } from '@nestjs/common';
import { ConsultationTitleService } from './consultation-title.service';
import { ConsultationTitleController } from './consultation-title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationTitle } from './entities/consultation-title.entity';
import { ConsultationTypeModule } from '../consultation-type/consultation-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultationTitle]),
    ConsultationTypeModule,
  ],
  controllers: [ConsultationTitleController],
  providers: [ConsultationTitleService],
  exports: [ConsultationTitleService],
})
export class ConsultationTitleModule {}
