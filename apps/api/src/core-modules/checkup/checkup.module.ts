import { forwardRef, Module } from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { CheckupController } from './checkup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkup } from './entities/checkup.entity';
import { UserModule } from '../user/user.module';
import { PatientCasesModule } from '../patient-cases/patient-cases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checkup]),
    UserModule,
    forwardRef(() => PatientCasesModule),
  ],
  controllers: [CheckupController],
  providers: [CheckupService],
  exports: [CheckupService],
})
export class CheckupModule {}
