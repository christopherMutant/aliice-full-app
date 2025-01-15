import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateInabilityDto } from './dto/create-inability.dto';
import { UpdateInabilityDto } from './dto/update-inability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inability } from '../all-entities';
import { Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { CheckupService } from '../checkup/checkup.service';
import { InabilityResponseType } from './types/inability-response.type';

@Injectable()
export class InabilityService {
  constructor(
    @InjectRepository(Inability)
    private readonly inabilityRepository: Repository<InabilityResponseType>,
    private readonly checkupService: CheckupService,
  ) {}
  async create(
    createInabilityDto: CreateInabilityDto,
  ): Promise<InabilityResponseType> {
    const checkup = await this.checkupService.findOne(
      createInabilityDto.checkupId,
    );

    try {
      const inability = await this.inabilityRepository.save({
        ...createInabilityDto,
        checkup,
      });

      return await this.findOne(inability.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOne(id: string): Promise<InabilityResponseType> {
    const inability = await this.inabilityRepository.findOne({
      where: { id },
      select: {
        id: true,
        dateStart: true,
        days: true,
        incapacityForWork: true,
        ability: true,
        cause: true,
      },
    });

    if (!inability) {
      throw new NotFoundException(
        ConstantMessage.INABILITY_NOT_FOUND,
      );
    }

    return inability;
  }

  async update(
    id: string,
    updateInabilityDto: UpdateInabilityDto,
  ): Promise<void> {
    const inability = await this.findOne(id);

    const checkup = await this.checkupService.findOne(
      updateInabilityDto.checkupId,
    );

    try {
      await this.inabilityRepository.save({
        ...inability,
        ...updateInabilityDto,
        checkup,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const inability = await this.findOne(id);

    try {
      await this.inabilityRepository.softRemove({ id: inability.id });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
