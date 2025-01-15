import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateCheckupDto } from './dto/create-checkup.dto';
import { UpdateCheckupDto } from './dto/update-checkup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkup, PatientCaseService } from '../all-entities';
import { Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UserService } from '../user/user.service';
import {
  PatientCaseServiceTypes,
  ServiceStatus,
} from '../../shared/types/enums';
import { ConstantMessage } from '../../constants/constant-messages';
import { CheckupResponseType } from './types/checkup-response.type';
import { PatientCasesService } from '../patient-cases/patient-cases.service';

@Injectable()
export class CheckupService {
  constructor(
    @InjectRepository(Checkup)
    private readonly checkupRepository: Repository<Checkup>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => PatientCasesService))
    private readonly patientCasesService: PatientCasesService,
  ) {}

  async create(
    createCheckupDto: CreateCheckupDto,
  ): Promise<CheckupResponseType> {
    const patient = await this.userService.findOne(
      createCheckupDto.patient,
    );

    const doctor = await this.userService.findOne(
      createCheckupDto.doctor,
    );

    const status = createCheckupDto.status || ServiceStatus.OPEN;

    const patientCase = createCheckupDto.patientCase
      ? await this.patientCasesService.findOne(
          createCheckupDto.patientCase,
        )
      : null;

    const patientCaseService =
      await this.patientCasesService.createPatientCaseService(
        patientCase,
        PatientCaseServiceTypes.CHECKUP,
      );

    try {
      const checkup = await this.checkupRepository.save({
        ...createCheckupDto,
        patient,
        doctor,
        status,
        patientCaseService,
      });

      return await this.findOne(checkup.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOne(id: string): Promise<CheckupResponseType> {
    const checkup = await this.checkupRepository.findOne({
      where: { id },
      relations: {
        patient: true,
        doctor: true,
        inability: true,
      },
      select: {
        id: true,
        type: true,
        status: true,
        date: true,
        subject: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
        },
        doctor: {
          id: true,
          firstName: true,
          lastName: true,
        },
        inability: {
          id: true,
          dateStart: true,
          days: true,
          incapacityForWork: true,
          ability: true,
          cause: true,
        },
      },
    });

    if (!checkup) {
      throw new NotFoundException(ConstantMessage.CHECKUP_NOT_FOUND);
    }

    return checkup;
  }

  async update(
    id: string,
    updateCheckupDto: UpdateCheckupDto,
  ): Promise<void> {
    const checkup = await this.findOne(id);

    const patient = await this.userService.findOne(
      updateCheckupDto.patient,
    );

    const doctor = await this.userService.findOne(
      updateCheckupDto.doctor,
    );

    try {
      await this.checkupRepository.save({
        ...checkup,
        ...updateCheckupDto,
        patient,
        doctor,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const checkup = await this.findOneWithPatientCaseService(id);

    const patientCaseService = checkup.patientCaseService;
    try {
      // await this.checkupRepository.softRemove({ id: checkup.id });
      await this.patientCasesService.removePatientCaseServices(
        patientCaseService.id,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async createConsultation(
    createCheckupDto: CreateCheckupDto,
    patientCaseService: PatientCaseService,
  ): Promise<CheckupResponseType> {
    const patient = await this.userService.findOne(
      createCheckupDto.patient,
    );

    const doctor = await this.userService.findOne(
      createCheckupDto.doctor,
    );

    const status = createCheckupDto.status || ServiceStatus.OPEN;

    try {
      const checkup = await this.checkupRepository.save({
        ...createCheckupDto,
        patient,
        doctor,
        status,
        patientCaseService,
      });

      return await this.findOne(checkup.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneWithPatientCaseService(id: string): Promise<Checkup> {
    const procedures = await this.checkupRepository.findOne({
      where: { id },
      relations: { patientCaseService: true },
    });

    return procedures;
  }
}
