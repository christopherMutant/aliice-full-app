import { Module } from '@nestjs/common';
import { LaboratoryRequestService } from './laboratory-request.service';
import { LaboratoryRequestController } from './laboratory-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryRequest } from '../all-entities';
import { AnalysisModule } from '../analysis/analysis.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LaboratoryRequest]),
    AnalysisModule,
    UserModule,
  ],
  controllers: [LaboratoryRequestController],
  providers: [LaboratoryRequestService],
})
export class LaboratoryRequestModule {}
