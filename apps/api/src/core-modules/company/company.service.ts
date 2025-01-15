import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { CompanyQueryListingDto } from './dto/company.list.dto';
import { PaginatedCompany } from './types/company.list';
import { EntityNames } from '../../config/entity-names';
import { GlobalHelper } from '../../config/app-global-helper';
import { CompanyTransformer } from './transformer/company.transformer';
import { CityService } from '../city/city.service';
import { CantonService } from '../canton/canton.service';
import { CountryService } from '../country/country.service';
import { AppErrorMessages } from '../../constants/app-error-messages';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly cityService: CityService,
    private readonly cantonService: CantonService,
    private readonly countryService: CountryService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const {
      organizationInformation,
      individualInformation,
      address,
      contactDetails,
      communicationPath,
      insuranceInformation,
    } = createCompanyDto;

    const city = address?.locality
      ? await this.cityService.findOne(address.locality)
      : null;
    const canton = address?.canton
      ? await this.cantonService.findOne(address.canton)
      : null;
    const country = address?.country
      ? await this.countryService.findOne(address.country)
      : null;

    try {
      const company = await this.companyRepository.save({
        ...organizationInformation,
        ...individualInformation,
        ...insuranceInformation,
        address: {
          ...address,
          locality: city,
          canton,
          country,
        },
        contactDetails: contactDetails,
        communicationPath: communicationPath,
      });
      return await this.findOne(company.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    companyQueryListingDto: CompanyQueryListingDto,
  ): Promise<PaginatedCompany> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      companyQueryListingDto.limit,
      companyQueryListingDto.offset,
    );

    const companyEntity = EntityNames.COMPANY;

    const queryBuilder = this.companyRepository
      .createQueryBuilder(companyEntity)
      .leftJoinAndSelect(`${companyEntity}.address`, 'address')
      .leftJoinAndSelect('address.locality', 'locality')
      .leftJoinAndSelect('address.canton', 'canton')
      .leftJoinAndSelect('address.country', 'country')
      .skip(offset)
      .take(limit);

    if (companyQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${companyEntity}.companyName ILIKE :search`, {
            search: `%${companyQueryListingDto.search}%`,
          });
        }),
      );
    }

    const [companies, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.COMPANY_FETCHED,
      data: companies.map(
        (company: Company) => new CompanyTransformer(company),
      ),
      pagination: { limit, offset, count },
    };
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        address: {
          locality: true,
          canton: true,
          country: true,
        },
      },
    });

    if (!company) {
      throw new NotFoundException(ConstantMessage.COMPANY_NOT_FOUND);
    }

    return new CompanyTransformer(company);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<void> {
    const {
      organizationInformation,
      individualInformation,
      address,
      contactDetails,
      communicationPath,
      insuranceInformation,
    } = updateCompanyDto;

    const company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        address: true,
      },
    });

    const city = address?.locality
      ? await this.cityService.findOne(address.locality)
      : company.address?.locality || null;
    const canton = address?.canton
      ? await this.cantonService.findOne(address.canton)
      : company.address?.canton || null;
    const country = address?.country
      ? await this.countryService.findOne(address.country)
      : company.address?.country || null;

    const updatedCompany = {
      ...company,
      ...organizationInformation,
      contactDetails: contactDetails,
      communicationPath: communicationPath,
      ...individualInformation,
      ...insuranceInformation,
      address: {
        ...address,
        locality: city,
        canton,
        country,
      },
    };

    try {
      await this.companyRepository.save(updatedCompany);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const company = await this.findOne(id);
    try {
      await this.companyRepository.softRemove(company);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
