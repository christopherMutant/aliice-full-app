import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from '../all-entities';
import { CityModule } from '../city/city.module';
import { CantonModule } from '../canton/canton.module';
import { CountryModule } from '../country/country.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    CityModule,
    CantonModule,
    CountryModule,
    SharedModule,
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
