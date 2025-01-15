import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateBankDetailDto } from './dto/create-bank-detail.dto';
import { UpdateBankDetailDto } from './dto/update-bank-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDetails } from '../all-entities';
import { Repository } from 'typeorm';
import { BankDetailTransformer } from './transformer/bank-detail.transformer';
import { ConstantMessage } from '../../constants/constant-messages';
import { CityService } from '../city/city.service';
import { CountryService } from '../country/country.service';
import { AppErrorMessages } from '../../constants/app-error-messages';

@Injectable()
export class BankDetailsService {
  constructor(
    @InjectRepository(BankDetails)
    private readonly bankDetailsRepository: Repository<BankDetails>,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
  ) {}

  async create(
    createBankDetailDto: CreateBankDetailDto,
  ): Promise<BankDetails> {
    const locality = await this.cityService.findOne(
      createBankDetailDto.locality,
    );

    const country = await this.countryService.findOne(
      createBankDetailDto.country,
    );

    try {
      const bankDetails = await this.bankDetailsRepository.save({
        ...createBankDetailDto,
        locality,
        country,
      });
      return new BankDetailTransformer(bankDetails);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(): Promise<BankDetails[]> {
    return await this.bankDetailsRepository.find();
  }

  async findOne(id: string): Promise<BankDetails> {
    const bankdetails = await this.bankDetailsRepository.findOneBy({
      id,
    });

    if (!bankdetails) {
      throw new NotFoundException(
        ConstantMessage.BANKDETAILS_NOT_FOUND,
      );
    }

    return bankdetails;
  }

  async update(
    id: string,
    updateBankdDetailDto: UpdateBankDetailDto,
  ): Promise<void> {
    const bankdetails = await this.findOne(id);

    const locality = updateBankdDetailDto.locality
      ? await this.cityService.findOne(updateBankdDetailDto.locality)
      : bankdetails.locality || null;

    const country = updateBankdDetailDto.country
      ? await this.countryService.findOne(
          updateBankdDetailDto.country,
        )
      : bankdetails.country || null;

    const updatedBankdetails = {
      ...bankdetails,
      ...updateBankdDetailDto,
      locality,
      country,
    };
    try {
      await this.bankDetailsRepository.save(updatedBankdetails);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const bankdetails = await this.findOne(id);
    try {
      await this.bankDetailsRepository.softRemove(bankdetails);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
