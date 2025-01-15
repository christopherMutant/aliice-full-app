import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAnalysisResultDto } from './dto/create-analysis-result.dto';
import { UpdateAnalysisResultDto } from './dto/update-analysis-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalysisResult } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AnalysisService } from '../analysis/analysis.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { AnalysisResultResponseType } from './types/analysis-result-response.type';
import { UserService } from '../user/user.service';
import { AnalysisResultQueryDto } from './dto/analysis-result-list.dto';
import { EntityNames } from '../../config/entity-names';
// import { ConsultationBodyService } from '../consultation-body/consultation-body.service';

@Injectable()
export class AnalysisResultsService {
  constructor(
    @InjectRepository(AnalysisResult)
    private readonly analysisResultRepository: Repository<AnalysisResult>,
    private readonly userService: UserService,
    private readonly analysisService: AnalysisService, // @Inject(forwardRef(() => ConsultationBodyService)) // private readonly consultationBodyService: ConsultationBodyService,
  ) {}

  async create(
    createAnalysisResultDto: CreateAnalysisResultDto,
  ): Promise<AnalysisResultResponseType> {
    const analysis = await this.analysisService.findOne(
      createAnalysisResultDto.analysis,
    );

    const patient = await this.userService.findOne(
      createAnalysisResultDto.patient,
    );

    // const analysisConsultation =
    // (await this.consultationBodyService.findAnalysisConsultation(
    //   createAnalysisResultDto.analysisConsultation,
    // )) || null;
    try {
      const analysisResult = await this.analysisResultRepository.save(
        {
          ...createAnalysisResultDto,
          analysis,
          patient,
          analysisConsultation: null,
          // analysisConsultation,
        },
      );
      return await this.findOne(analysisResult.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    analysisResultQueryDto: AnalysisResultQueryDto,
  ): Promise<AnalysisResultResponseType[]> {
    const patient = await this.userService.findOne(
      analysisResultQueryDto.patient,
    );

    const analysisResultEntity = EntityNames.ANALYSIS_RESULT;
    const analysisEntity = EntityNames.ANALYSIS;

    const queryBuilder = this.analysisResultRepository
      .createQueryBuilder(analysisResultEntity)
      .innerJoinAndSelect(
        `${analysisResultEntity}.patient`,
        `patient`,
      )
      .innerJoinAndSelect(
        `${analysisResultEntity}.analysis`,
        `${analysisEntity}`,
      )
      .where(`patient.id = :patient`, { patient: patient.id })
      .select([
        `${analysisResultEntity}.id`,
        `${analysisResultEntity}.date`,
        `${analysisResultEntity}.result`,
        `${analysisEntity}.id`,
        `${analysisEntity}.name`,
        `${analysisEntity}.shortName`,
        `${analysisEntity}.unit`,
        `${analysisEntity}.reference`,
        `${analysisEntity}.category`,
        `patient.id`,
        `patient.firstName`,
        `patient.lastName`,
      ])
      .orderBy(`${analysisResultEntity}.date`, 'ASC');

    if (analysisResultQueryDto.from) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${analysisResultEntity}.date >= :from`, {
            from: analysisResultQueryDto.from,
          });
        }),
      );
    }

    if (analysisResultQueryDto.to) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${analysisResultEntity}.date <= :to`, {
            to: analysisResultQueryDto.to,
          });
        }),
      );
    }

    if (analysisResultQueryDto.category) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${analysisEntity}.category = :category`, {
            category: `${analysisResultQueryDto.category}`,
          });
        }),
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<AnalysisResultResponseType> {
    const analysisResult =
      await this.analysisResultRepository.findOne({
        where: { id },
        relations: { analysis: true, patient: true },
        select: {
          id: true,
          analysis: {
            id: true,
            name: true,
            shortName: true,
            unit: true,
            category: true,
            reference: true,
          },
          patient: {
            id: true,
            firstName: true,
            lastName: true,
          },
          date: true,
          result: true,
        },
      });

    if (!analysisResult) {
      throw new NotFoundException(
        ConstantMessage.ANALYSIS_RESULT_NOT_FOUND,
      );
    }

    return analysisResult;
  }

  async update(
    id: string,
    updateAnalysisResultDto: UpdateAnalysisResultDto,
  ): Promise<void> {
    const analysisResult = await this.findOne(id);

    const analysis = await this.analysisService.findOne(
      updateAnalysisResultDto.analysis,
    );

    const patient = await this.userService.findOne(
      updateAnalysisResultDto.patient,
    );

    // const analysisConsultation =
    //   (await this.consultationBodyService.findAnalysisConsultation(
    //     updateAnalysisResultDto.analysisConsultation,
    //   )) || null;

    try {
      await this.analysisResultRepository.save({
        ...analysisResult,
        ...updateAnalysisResultDto,
        analysis,
        patient,
        analysisConsultation: null,
        // analysisConsultation,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const analysisResult = await this.findOne(id);

    try {
      await this.analysisResultRepository.softRemove(analysisResult);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findEntry(id: string): Promise<AnalysisResultResponseType> {
    const analysisResult =
      await this.analysisResultRepository.findOne({
        where: { id },
        relations: {
          analysis: true,
        },
        select: {
          id: true,
          analysis: {
            id: true,
            name: true,
            shortName: true,
            unit: true,
            category: true,
          },
          date: true,
          result: true,
        },
      });

    return analysisResult;
  }
}
