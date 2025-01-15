import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateLaboratoryRequestDto } from './dto/create-laboratory-request.dto';
import { UpdateLaboratoryRequestDto } from './dto/update-laboratory-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis, LaboratoryRequest } from '../all-entities';
import { Repository } from 'typeorm';
import { AnalysisService } from '../analysis/analysis.service';
import { UserService } from '../user/user.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { LaboratoryRequestQueryDto } from './dto/laboratory-request-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { LaboratoryRequestResponseType } from './types/laboratory-request-response.type';

@Injectable()
export class LaboratoryRequestService {
  constructor(
    @InjectRepository(LaboratoryRequest)
    private readonly laboratoryRequestRepository: Repository<LaboratoryRequest>,
    private readonly analysisService: AnalysisService,
    private readonly userService: UserService,
  ) {}

  async create(
    createLaboratoryRequestDto: CreateLaboratoryRequestDto,
  ): Promise<LaboratoryRequestResponseType> {
    const patient = await this.userService.findOne(
      createLaboratoryRequestDto.patient,
    );

    const analyses: Analysis[] = [];

    for (const analysis of createLaboratoryRequestDto.analyses) {
      analyses.push(
        (await this.analysisService.findOne(analysis)) as Analysis,
      );
    }

    try {
      const laboratoryRequest =
        await this.laboratoryRequestRepository.save({
          ...createLaboratoryRequestDto,
          patient,
          analyses,
        });

      return await this.findOne(laboratoryRequest.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    laboratoryRequestQueryDto: LaboratoryRequestQueryDto,
  ): Promise<LaboratoryRequestResponseType[]> {
    const laboratoryRequests =
      await this.laboratoryRequestRepository.find({
        where: { patient: { id: laboratoryRequestQueryDto.patient } },
        relations: { patient: true, analyses: true },
        select: {
          id: true,
          patient: { id: true, firstName: true, lastName: true },
          analyses: {
            id: true,
            name: true,
            shortName: true,
          },
          dueDate: true,
          dateRequired: true,
          noticed: true,
        },
      });

    return laboratoryRequests;
  }

  async findOne(id: string): Promise<LaboratoryRequestResponseType> {
    const laboratoryRequest =
      await this.laboratoryRequestRepository.findOne({
        where: { id },
        relations: { patient: true, analyses: true },
        select: {
          id: true,
          patient: { id: true, firstName: true, lastName: true },
          analyses: {
            id: true,
            name: true,
            shortName: true,
          },
          dueDate: true,
          dateRequired: true,
          noticed: true,
        },
      });

    if (!laboratoryRequest) {
      throw new NotFoundException(
        ConstantMessage.LABORATORY_REQUEST_NOT_FOUND,
      );
    }

    return laboratoryRequest;
  }

  async update(
    id: string,
    updateLaboratoryRequestDto: UpdateLaboratoryRequestDto,
  ): Promise<void> {
    const laboratoryRequest = await this.findOne(id);

    const patient = await this.userService.findOne(
      updateLaboratoryRequestDto.patient,
    );

    const analyses: Analysis[] = [];

    for (const analysis of updateLaboratoryRequestDto.analyses) {
      analyses.push(
        (await this.analysisService.findOne(analysis)) as Analysis,
      );
    }

    try {
      await this.laboratoryRequestRepository.save({
        ...laboratoryRequest,
        ...updateLaboratoryRequestDto,
        patient,
        analyses,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const laboratoryRequest = await this.findOne(id);

    try {
      await this.laboratoryRequestRepository.softRemove(
        laboratoryRequest,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
