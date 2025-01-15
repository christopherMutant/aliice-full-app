import { Module } from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { BankDetailsController } from './bank-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDetails } from '../all-entities';
import { CityModule } from '../city/city.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankDetails]),
    CityModule,
    CountryModule,
  ],
  controllers: [BankDetailsController],
  providers: [BankDetailsService],
  exports: [BankDetailsService],
})
export class BankDetailsModule {}
