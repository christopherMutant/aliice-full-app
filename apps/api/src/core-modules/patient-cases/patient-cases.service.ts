import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreatePatientCaseDto } from './dto/create-patient-case.dto';
import { UpdatePatientCaseDto } from './dto/update-patient-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientCase, PatientCaseService } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { PatientCaseListQueryListingDto } from './dto/patient-case-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { PatientCaseResponseType } from './types/patient-case-response-type';
import { EntityNames } from '../../config/entity-names';
import { GlobalHelper } from '../../config/app-global-helper';
import { PatientCaseListType } from './types/patient-case-list-type';
import { CheckupService } from '../checkup/checkup.service';
import {
  CheckUpTypes,
  PatientCaseServiceTypes,
  PatientCaseStatus,
  ServiceStatus,
} from '../../shared/types/enums';
import { ProceduresService } from '../procedures/procedures.service';

@Injectable()
export class PatientCasesService {
  constructor(
    @InjectRepository(PatientCase)
    private readonly patientCaseRepository: Repository<PatientCase>,
    @InjectRepository(PatientCaseService)
    private readonly patientCaseServiceRepository: Repository<PatientCaseService>,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => CheckupService))
    private readonly checkupService: CheckupService,
    @Inject(forwardRef(() => ProceduresService))
    private readonly proceduresService: ProceduresService,
  ) {}
  async create(
    createPatientCaseDto: CreatePatientCaseDto,
  ): Promise<PatientCase> {
    const patient = await this.userService.findOne(
      createPatientCaseDto.patient,
    );
    const referringPhysician = await this.userService.findOne(
      createPatientCaseDto.referringPhysician,
    );

    const billThrough = createPatientCaseDto.billThrough
      ? await this.companyService.findOne(
          createPatientCaseDto.billThrough,
        )
      : null;

    try {
      const patientCase = await this.patientCaseRepository.save({
        ...createPatientCaseDto,
        patient,
        referringPhysician,
        billThrough,
        status: PatientCaseStatus.CONSULTATION,
        services: [
          {
            relatedType: PatientCaseServiceTypes.CHECKUP,
          },
        ],
      });

      const patientCaseService = patientCase.services[0];

      //automatically create a consultation, default date is at the moment of patient case
      const consultationCheckup =
        await this.checkupService.createConsultation(
          {
            patient: patient.id,
            doctor: referringPhysician.id,
            date: new Date(),
            type: CheckUpTypes.CONSULTATION,
            subject: createPatientCaseDto.patientConcern,
            status: ServiceStatus.OPEN,
            patientCase: null,
          },
          patientCaseService,
        );

      await this.patientCaseServiceRepository.save({
        ...patientCaseService,
        relatedObject: consultationCheckup.id,
      });

      return await this.findOne(patientCase.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    patientCaseListQueryListingDto: PatientCaseListQueryListingDto,
  ): Promise<PatientCaseListType> {
    const patient = await this.userService.findOne(
      patientCaseListQueryListingDto.patient,
    );

    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      patientCaseListQueryListingDto.limit,
      patientCaseListQueryListingDto.offset,
    );
    const patientCaseRepository = EntityNames.PATIENT_CASE;
    const queryBuilder = this.patientCaseRepository
      .createQueryBuilder(patientCaseRepository)
      .select([
        `${patientCaseRepository}.id`,
        `${patientCaseRepository}.caseNo`,
        `${patientCaseRepository}.dateOfCase`,
        `${patientCaseRepository}.concerned`,
        `${patientCaseRepository}.law`,
        `${patientCaseRepository}.externalCaseNumber`,
      ])
      .where(
        new Brackets(qb => {
          qb.where(`${patientCaseRepository}.patient = :patient`, {
            patient: patient.id,
          });
        }),
      )
      .skip(offset)
      .take(limit)
      .orderBy(
        `${patientCaseRepository}.${patientCaseListQueryListingDto.orderBy}`,
        patientCaseListQueryListingDto.sort,
      );

    if (patientCaseListQueryListingDto.status) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${patientCaseRepository}.status = :status`, {
            status: patientCaseListQueryListingDto.status,
          });
        }),
      );
    }

    const [patientCases, count] =
      await queryBuilder.getManyAndCount();

    const tranformedPatientCases = [];
    for (const patientCase of patientCases) {
      tranformedPatientCases.push(
        this.transformPatientCase(patientCase),
      );
    }

    return {
      pagination: { limit, offset, count },
      message: ConstantMessage.PATIENT_CASE_FETCHED,
      data: tranformedPatientCases,
    };
  }

  async findOne(id: string): Promise<PatientCase> {
    const patientCase = await this.patientCaseRepository.findOne({
      where: { id },
      relations: {
        patient: true,
        referringPhysician: true,
        billThrough: true,
        diagnostics: true,
        invoiceAttachments: true,
        services: true,
      },
      select: {
        id: true,
        caseNo: true,
        patient: { id: true, firstName: true, lastName: true },
        referringPhysician: {
          id: true,
          firstName: true,
          lastName: true,
        },
        caseDifferentiation: true,
        dateOfCase: true,
        law: true,
        externalCaseNumber: true,
        closingDate: true,
        reasonForProcessing: true,
        placeOfDispensation: true,
        patientRequriringFurtherCare: true,
        noteForInvoice: true,
        refundType: true,
        recepient: true,
        copyToPatients: true,
        splitting: true,
        splittingLaw: true,
        splittingRefundType: true,
        splittingRecepient: true,
        splittingCopyToPatients: true,
        billingVia: true,
        billThrough: { id: true, companyName: true },
        diagnostics: {
          id: true,
          catalogue: { id: true, name: true },
          catalogueEntry: { id: true, description: true, code: true },
          text: true,
        },
        invoiceAttachments: {
          id: true,
          name: true,
          url: true,
          createdAt: true,
        },
        billingGroup: true,
        dueDateForBilling: true,
        automaticallyCloseCaseAfterBilling: true,
        serviceProvider: true,
        tarmedPointValueAndPersonalCatalogs: true,
        source: true,
        services: {
          id: true,
          relatedObject: true,
          relatedType: true,
        },
      },
    });

    if (!patientCase) {
      throw new NotFoundException(
        ConstantMessage.PATIENT_CASE_NOT_FOUND,
      );
    }

    return await this.getAllPatientServices(patientCase);
  }

  async findOneTransformed(
    id: string,
  ): Promise<PatientCaseResponseType> {
    const patientCase = await this.findOne(id);
    return this.transformPatientCase(patientCase);
  }

  async update(
    id: string,
    updatePatientCaseDto: UpdatePatientCaseDto,
  ): Promise<void> {
    const patientCase = await this.findOne(id);

    const patient = await this.userService.findOne(
      updatePatientCaseDto.patient,
    );
    const referringPhysician = await this.userService.findOne(
      updatePatientCaseDto.referringPhysician,
    );

    const billThrough = updatePatientCaseDto.billThrough
      ? await this.companyService.findOne(
          updatePatientCaseDto.billThrough,
        )
      : patientCase.billThrough;

    try {
      await this.patientCaseRepository.save({
        ...patientCase,
        ...updatePatientCaseDto,
        patient,
        referringPhysician,
        billThrough,
      });
    } catch {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const patientCase = await this.findOne(id);

    try {
      await this.patientCaseRepository.softRemove(patientCase);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async transformPatientCase(
    patientCase: PatientCase,
  ): Promise<PatientCaseResponseType> {
    const createdAt = (
      await this.patientCaseRepository.findOne({
        where: {
          id: patientCase.id,
        },
      })
    ).createdAt;
    const transformedPatientCase = {
      ...patientCase,
      caseNo: this.transformPatientCaseNumber(
        patientCase.caseNo,
        createdAt,
      ),
    } as PatientCaseResponseType;

    return transformedPatientCase;
  }

  transformPatientCaseNumber(
    caseNumber: number,
    createdAt: Date,
  ): string {
    return `ALIICE-${createdAt.getFullYear()}-${caseNumber}`;
  }

  async getAllPatientServices(
    patientCase: PatientCase,
  ): Promise<PatientCase> {
    const services = [];
    for (const service of patientCase.services) {
      switch (service.relatedType) {
        case PatientCaseServiceTypes.CHECKUP:
          const checkup = await this.checkupService.findOne(
            service.relatedObject,
          );

          services.push({
            ...checkup,
            relatedType: service.relatedType,
          });
          break;

        case PatientCaseServiceTypes.PROCEDURES:
          const procedures = await this.proceduresService.findOne(
            service.relatedObject,
          );

          services.push({
            ...procedures,
            relatedType: service.relatedType,
          });
          break;

        default:
          break;
      }
    }
    return {
      ...patientCase,
      services,
    };
  }

  async createPatientCaseService(
    patientCase: PatientCase,
    relatedType: PatientCaseServiceTypes,
  ): Promise<PatientCaseService> {
    try {
      const patientCaseServices =
        await this.patientCaseServiceRepository.save({
          patientCase,
          relatedType,
        });
      return patientCaseServices;
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async removePatientCaseServices(id: string): Promise<void> {
    try {
      await this.patientCaseServiceRepository.softRemove({ id });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
