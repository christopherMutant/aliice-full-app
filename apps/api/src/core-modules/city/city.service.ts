import { Injectable, NotFoundException } from '@nestjs/common';
import { CityQueryDto } from './dto/city-query.dto';
import { City } from '../all-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { CantonService } from '../canton/canton.service';
import { CountryService } from '../country/country.service';
import { Countries } from '../../shared/types/enums';
import { CityResponseType } from './types/country-response-type';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly cantonService: CantonService,
    private readonly countrySerice: CountryService,
  ) {}

  async create(): Promise<void> {
    const cities = await this.cityRepository.find();
    await Promise.all(
      cities.map(async city => {
        if (city.cantonCode) {
          city.canton = await this.cantonService.findOneByCode(
            city.cantonCode,
          );
          city.country = await this.countrySerice.findOnebyName(
            Countries.SWITZERLAND,
          );
        } else {
          city.country = await this.countrySerice.findOnebyName(
            Countries.LICHTENSTEIN,
          );
        }
        return await this.cityRepository.save(city);
      }),
    );
    return;
  }

  async findAll(
    cityQueryDto: CityQueryDto,
  ): Promise<CityResponseType[]> {
    const cityEntity = EntityNames.CITY;
    const countryEntity = EntityNames.COUNTRY;
    const cantonEntity = EntityNames.CANTON;

    const queryBuilder = this.cityRepository
      .createQueryBuilder(cityEntity)
      .innerJoinAndSelect(`${cityEntity}.country`, `${countryEntity}`)
      .innerJoinAndSelect(`${cityEntity}.canton`, `${cantonEntity}`)
      .select([
        `${cityEntity}.id`,
        `${cityEntity}.name`,
        `${cityEntity}.zipCode`,
        `${cantonEntity}.id`,
        `${cantonEntity}.name`,
        `${cantonEntity}.shortName`,
        `${countryEntity}.id`,
        `${countryEntity}.name`,
        `${countryEntity}.shortName`,
      ]);

    if (cityQueryDto.search) {
      queryBuilder
        .where(`LOWER(${cityEntity}.name) LIKE LOWER(:search)`, {
          search: `%${cityQueryDto.search}%`,
        })
        .orWhere(`LOWER(${cityEntity}.zipCode) LIKE LOWER(:search)`, {
          search: `%${cityQueryDto.search}%`,
        });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<CityResponseType> {
    try {
      return await this.cityRepository.findOne({
        select: {
          id: true,
          name: true,
          zipCode: true,
          country: { id: true, name: true, shortName: true },
          canton: { id: true, name: true, shortName: true },
        },
        relations: { country: true, canton: true },
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ConstantMessage.CITY_NOT_FOUND);
    }
  }
}
