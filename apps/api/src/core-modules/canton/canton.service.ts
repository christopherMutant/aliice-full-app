import { Injectable, NotFoundException } from '@nestjs/common';
import { Canton } from '../all-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CantonQueryDto } from './dto/canton-query.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { CantonResponseType } from './types/canton-response-type';

@Injectable()
export class CantonService {
  constructor(
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
  ) {}
  async findAll(
    cantonQueryDto: CantonQueryDto,
  ): Promise<CantonResponseType[]> {
    const queryBuilder = this.cantonRepository
      .createQueryBuilder('cantons')
      .select(['cantons.id', 'cantons.name', 'cantons.shortName']);
    if (cantonQueryDto.search) {
      queryBuilder.where(`LOWER(cantons.name) LIKE LOWER(:search)`, {
        search: `%${cantonQueryDto.search}%`,
      });
      queryBuilder.orWhere(
        `LOWER(cantons.shortName) LIKE LOWER(:search)`,
        {
          search: `%${cantonQueryDto.search}%`,
        },
      );
    }
    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<CantonResponseType> {
    try {
      return await this.cantonRepository.findOne({
        select: { id: true, name: true, shortName: true },
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ConstantMessage.CANTON_NOT_FOUND);
    }
  }

  async findOneByCode(code: string): Promise<Canton> {
    try {
      return await this.cantonRepository.findOne({
        select: { id: true, name: true, shortName: true },
        where: { shortName: code },
      });
    } catch (error) {
      throw new NotFoundException(ConstantMessage.CANTON_NOT_FOUND);
    }
  }
}
