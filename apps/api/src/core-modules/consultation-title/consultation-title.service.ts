import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateConsultationTitleDto } from './dto/create-consultation_title.dto';
import { UpdateConsultationTitleDto } from './dto/update-consultation_title.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationTitle } from '../all-entities';
import { Repository } from 'typeorm';
import { ConsultationTypeService } from '../consultation-type/consultation-type.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { ConsultationTitleResponseType } from './types/consultation-title-response-type';

@Injectable()
export class ConsultationTitleService {
  constructor(
    @InjectRepository(ConsultationTitle)
    private readonly consultationTitleRepository: Repository<ConsultationTitle>,
    private readonly consultationTypeService: ConsultationTypeService,
  ) {}
  async create(
    createConsultationTitleDto: CreateConsultationTitleDto,
  ): Promise<ConsultationTitleResponseType> {
    const consultationType =
      await this.consultationTypeService.findOne(
        createConsultationTitleDto.type,
      );
    try {
      const createConsultationTitle =
        await this.consultationTitleRepository.save({
          name: createConsultationTitleDto.name,
          type: consultationType,
        });
      return await this.findOne(createConsultationTitle.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(): Promise<ConsultationTitleResponseType[]> {
    return await this.consultationTitleRepository.find({
      select: {
        id: true,
        name: true,
        type: {
          id: true,
          name: true,
          icon: true,
          structure: true,
        },
      },
      relations: { type: true },
    });
  }

  async findOne(id: string): Promise<ConsultationTitleResponseType> {
    const consultationTitle =
      await this.consultationTitleRepository.findOne({
        where: { id },
        relations: { type: true },
        select: {
          id: true,
          name: true,
          type: {
            id: true,
            name: true,
            icon: true,
            structure: true,
          },
        },
      });

    if (!consultationTitle) {
      throw new NotFoundException(
        ConstantMessage.CONSULTATION_TITLE_NOT_FOUND,
      );
    }

    return consultationTitle;
  }

  async update(
    id: string,
    updateConsultationTitleDto: UpdateConsultationTitleDto,
  ): Promise<void> {
    const consultationTitle = await this.findOne(id);
    const type = await this.consultationTypeService.findOne(
      updateConsultationTitleDto.type,
    );
    try {
      await this.consultationTitleRepository.save({
        ...consultationTitle,
        ...updateConsultationTitleDto,
        type,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const consultationTitle = await this.findOne(id);
    try {
      await this.consultationTitleRepository.softRemove(
        consultationTitle,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
