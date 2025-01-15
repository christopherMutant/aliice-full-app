import { forwardRef, Module } from '@nestjs/common';
import { AnalysisResultsService } from './analysis-results.service';
import { AnalysisResultsController } from './analysis-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisResult } from '../all-entities';
import { AnalysisModule } from '../analysis/analysis.module';
import { UserModule } from '../user/user.module';
// import { ConsultationBodyModule } from '../consultation-body/consultation-body.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysisResult]),
    AnalysisModule,
    UserModule,
    // forwardRef(() => ConsultationBodyModule),
  ],
  controllers: [AnalysisResultsController],
  providers: [AnalysisResultsService],
  exports: [AnalysisResultsService],
})
export class AnalysisResultsModule {}
