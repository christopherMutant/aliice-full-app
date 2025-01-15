import { forwardRef, Module } from '@nestjs/common';
import { PatientCasesController } from './patient-cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientCase, PatientCaseService } from '../all-entities';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { CheckupModule } from '../checkup/checkup.module';
import { PatientCasesService } from './patient-cases.service';
import { ProceduresModule } from '../procedures/procedures.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientCase, PatientCaseService]),
    UserModule,
    CompanyModule,
    forwardRef(() => CheckupModule),
    forwardRef(() => ProceduresModule),
  ],
  controllers: [PatientCasesController],
  providers: [PatientCasesService],
  exports: [PatientCasesService],
})
export class PatientCasesModule {}
