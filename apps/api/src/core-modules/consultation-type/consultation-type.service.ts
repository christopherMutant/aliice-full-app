import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationType } from '../all-entities';
import { Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { ConsultationTypeResponseType } from './types/consultation-type-response-type';

@Injectable()
export class ConsultationTypeService {
  constructor(
    @InjectRepository(ConsultationType)
    private readonly consultationTypeRepository: Repository<ConsultationType>,
  ) {}
  async findAll(): Promise<ConsultationTypeResponseType[]> {
    const consultationTypes =
      await this.consultationTypeRepository.find({
        select: {
          id: true,
          name: true,
          icon: true,
          structure: true,
        },
      });
    return consultationTypes;
  }

  async findOne(id: string): Promise<ConsultationTypeResponseType> {
    const consultationType =
      await this.consultationTypeRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          icon: true,
          structure: true,
        },
      });

    if (!consultationType) {
      throw new NotFoundException(
        ConstantMessage.CONSULTATION_TYPE_NOT_FOUND,
      );
    }

    return consultationType;
  }
}
