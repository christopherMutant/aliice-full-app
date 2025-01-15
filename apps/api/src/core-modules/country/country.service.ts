import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../all-entities';
import { CountryResponseType } from './types/country-response-type';
import { ConstantMessage } from '../../constants/constant-messages';
import { CountryQueryDto } from './dto/country-query.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(
    countryQueryDto: CountryQueryDto,
  ): Promise<CountryResponseType[]> {
    const queryBuilder = this.countryRepository
      .createQueryBuilder('countries')
      .select([
        'countries.id',
        'countries.name',
        'countries.shortName',
      ]);
    if (countryQueryDto.search) {
      queryBuilder.where(
        `LOWER(countries.name) LIKE LOWER(:search)`,
        {
          search: `%${countryQueryDto.search}%`,
        },
      );
      queryBuilder.orWhere(
        `LOWER(countries.shortName) LIKE LOWER(:search)`,
        {
          search: `%${countryQueryDto.search}%`,
        },
      );
    }
    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<CountryResponseType> {
    try {
      return await this.countryRepository.findOne({
        select: { id: true, name: true, shortName: true },
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ConstantMessage.COUNTRY_NOT_FOUND);
    }
  }

  async findOnebyName(name: string): Promise<Country> {
    try {
      return await this.countryRepository.findOne({
        select: { id: true, name: true, shortName: true },
        where: { name },
      });
    } catch (error) {
      throw new NotFoundException(ConstantMessage.COUNTRY_NOT_FOUND);
    }
  }
}
