import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SharedModule } from '../../shared/shared.module';
import {
  Family,
  Insurance,
  Reference,
  UserRole,
} from '../all-entities';
import { MedicalNoteModule } from '../medical-note/medical-note.module';
import { RoleModule } from '../role/role.module';
import { DepartmentsModule } from '../departments/departments.module';
import { CityModule } from '../city/city.module';
import { CantonModule } from '../canton/canton.module';
import { CountryModule } from '../country/country.module';
import { BankDetailsModule } from '../bank-details/bank-details.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      Family,
      Insurance,
      Reference,
    ]),
    SharedModule,
    RoleModule,
    DepartmentsModule,
    forwardRef(() => MedicalNoteModule),
    CityModule,
    CantonModule,
    CountryModule,
    BankDetailsModule,
    CompanyModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
