import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../all-entities';
import { CountryModule } from '../country/country.module';
import { CantonModule } from '../canton/canton.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    CountryModule,
    CantonModule,
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
