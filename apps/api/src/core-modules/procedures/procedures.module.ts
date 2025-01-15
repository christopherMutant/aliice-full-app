import { forwardRef, Module } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure, ProcedureItem } from '../all-entities';
import { PatientCasesModule } from '../patient-cases/patient-cases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Procedure, ProcedureItem]),
    forwardRef(() => PatientCasesModule),
  ],
  controllers: [ProceduresController],
  providers: [ProceduresService],
  exports: [ProceduresService],
})
export class ProceduresModule {}
