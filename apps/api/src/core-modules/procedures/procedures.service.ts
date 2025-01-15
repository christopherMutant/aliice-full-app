import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '../all-entities';
import { Repository } from 'typeorm';
import { PatientCasesService } from '../patient-cases/patient-cases.service';
import { PatientCaseServiceTypes } from '../../shared/types/enums';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ProceduresResponseType } from './types/procedures-response.type';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
    @Inject(forwardRef(() => PatientCasesService))
    private readonly patientCasesService: PatientCasesService,
  ) {}
  async create(
    createProcedureDto: CreateProcedureDto,
  ): Promise<ProceduresResponseType> {
    const patientCase = await this.patientCasesService.findOne(
      createProcedureDto.patientCase,
    );

    try {
      const patientCaseService =
        await this.patientCasesService.createPatientCaseService(
          patientCase,
          PatientCaseServiceTypes.PROCEDURES,
        );

      const procedures = await this.procedureRepository.save({
        ...createProcedureDto,
        patientCaseService,
      });

      return await this.findOne(procedures.id);
    } catch (error) {
      // throw new NotImplementedException(
      //   AppErrorMessages.database_error,
      // );
      throw error;
    }
  }

  async findOne(id: string): Promise<ProceduresResponseType> {
    const procedures = await this.procedureRepository.findOne({
      where: { id },
    });

    if (!procedures) {
      throw new NotFoundException(
        ConstantMessage.PROCEDURES_NOT_FOUND,
      );
    }

    return procedures;
  }

  async update(
    id: string,
    updateProcedureDto: UpdateProcedureDto,
  ): Promise<void> {
    const procedures = await this.findOne(id);

    try {
      await this.procedureRepository.save({
        ...procedures,
        ...updateProcedureDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const procedures = await this.findOneWithPatientCaseService(id);

    const patientCaseServices = procedures.patientCaseService;

    try {
      await this.patientCasesService.removePatientCaseServices(
        patientCaseServices.id,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneWithPatientCaseService(
    id: string,
  ): Promise<Procedure> {
    const procedures = await this.procedureRepository.findOne({
      where: { id },
      relations: { patientCaseService: true },
    });

    return procedures;
  }
}
