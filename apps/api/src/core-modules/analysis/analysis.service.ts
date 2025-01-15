import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis } from '../all-entities';
import { ILike, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { AnalysisResponseType } from './types/analysis-response-type';
import { AnalysesQueryDto } from './dto/analyses-list.dto';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private readonly analysisRepository: Repository<Analysis>,
  ) {}

  async create(
    createAnalysisDto: CreateAnalysisDto,
  ): Promise<AnalysisResponseType> {
    try {
      const analysis = await this.analysisRepository.save(
        createAnalysisDto,
      );
      return await this.findOne(analysis.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    analysesQueryDto: AnalysesQueryDto,
  ): Promise<AnalysisResponseType[]> {
    return await this.analysisRepository.find({
      select: {
        id: true,
        name: true,
        shortName: true,
        unit: true,
        category: true,
      },
      where: [
        {
          ...(analysesQueryDto?.search && {
            name: ILike(`%${analysesQueryDto.search}%`),
          }),
        },
        {
          ...(analysesQueryDto?.search && {
            shortName: ILike(`%${analysesQueryDto.search}%`),
          }),
        },
        {
          ...(analysesQueryDto?.category && {
            category: analysesQueryDto.category,
          }),
        },
      ],
    });
  }

  async findOne(id: string): Promise<AnalysisResponseType> {
    const analysis = await this.analysisRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        shortName: true,
        unit: true,
        category: true,
      },
    });

    if (!analysis) {
      throw new NotFoundException(ConstantMessage.ANALYSIS_NOT_FOUND);
    }

    return analysis;
  }

  async update(
    id: string,
    updateAnalysisDto: UpdateAnalysisDto,
  ): Promise<void> {
    const analysis = await this.findOne(id);
    try {
      await this.analysisRepository.save({
        ...analysis,
        ...updateAnalysisDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const analysis = await this.findOne(id);
    try {
      await this.analysisRepository.softRemove(analysis);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
