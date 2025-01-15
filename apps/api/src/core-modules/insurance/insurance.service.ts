import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { Insurance } from '../all-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceTransformer } from './transformers/insurance.tranformer';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { CompanyService } from '../company/company.service';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private readonly insuranceRepository: Repository<Insurance>,
    private readonly companyService: CompanyService,
  ) {}

  async create(
    createInsuranceDto: CreateInsuranceDto,
  ): Promise<Insurance> {
    try {
      const company = await this.companyService.findOne(
        createInsuranceDto.company,
      );
      const createInsurance = await this.insuranceRepository.save({
        ...createInsuranceDto,
        company,
      });

      const insurance = await this.findOne(createInsurance.id);
      return new InsuranceTransformer(insurance);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async update(
    id: string,
    updateInsuranceDto: UpdateInsuranceDto,
  ): Promise<void> {
    const insurance = await this.findOne(id);
    try {
      const company = updateInsuranceDto.company
        ? await this.companyService.findOne(
            updateInsuranceDto.company,
          )
        : insurance.company || null;
      const updatedInsurance = {
        ...insurance,
        ...updateInsuranceDto,
        company,
      };
      await this.insuranceRepository.save(updatedInsurance);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOne(id: string): Promise<Insurance> {
    const insurance = await this.insuranceRepository.findOneBy({
      id,
    });

    if (!insurance) {
      throw new NotFoundException(
        ConstantMessage.INSURANCE_NOT_FOUND,
      );
    }

    return insurance;
  }
}
