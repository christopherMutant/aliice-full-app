import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAppointmentStatusDto } from './dto/create-appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppointmentStatusTransformer } from './transformer/appointment-status.transformer';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { AppointmentStatusQueryListingDto } from './dto/appointment-status-list.dto';
import { AppointmentStatusResponseType } from './types/appointment-status.type';
import { PaginatedAppointmentStatusType } from './types/appointment-status-paginated.type';
import { AppointmentStatusInListTransformer } from './transformer/appointment-status-in-list.transformer';

@Injectable()
export class AppointmentStatusService {
  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly appointmentStatusRepository: Repository<AppointmentStatus>,
  ) {}

  async create(
    createAppointmentStatusDto: CreateAppointmentStatusDto,
  ): Promise<AppointmentStatusResponseType> {
    try {
      const createAppointmentStatus =
        await this.appointmentStatusRepository.save({
          ...createAppointmentStatusDto,
        });
      return await this.findOne(createAppointmentStatus.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    appointmentStatusQueryListingDto: AppointmentStatusQueryListingDto,
  ): Promise<PaginatedAppointmentStatusType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      appointmentStatusQueryListingDto.limit,
      appointmentStatusQueryListingDto.offset,
    );

    const appointmentStatusEntity = EntityNames.APPOINTMENT_STATUS;

    const queryBuilder = this.appointmentStatusRepository
      .createQueryBuilder(appointmentStatusEntity)
      .skip(offset)
      .take(limit)
      .orderBy(`${appointmentStatusEntity}.name`);

    if (appointmentStatusQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${appointmentStatusEntity}.name ILIKE :search`, {
            search: `%${appointmentStatusEntity.search}%`,
          });
        }),
      );
    }

    const [appointmentStatus, count] =
      await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.APPOINTMENT_STATUS_FETCHED,
      data: appointmentStatus.map(
        status => new AppointmentStatusTransformer(status),
      ),
      pagination: { limit, offset, count },
    };
  }

  async findAllList(): Promise<AppointmentStatus[]> {
    const appointmentStatus =
      await this.appointmentStatusRepository.find();

    return appointmentStatus.map(
      status => new AppointmentStatusInListTransformer(status),
    );
  }

  async findOne(id: string): Promise<AppointmentStatus> {
    const appointmentStatus = await this.findOneById(id);
    return new AppointmentStatusTransformer(appointmentStatus);
  }

  async update(
    id: string,
    updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ): Promise<void> {
    await this.findOneById(id);
    try {
      await this.appointmentStatusRepository.save({
        id,
        ...updateAppointmentStatusDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOneById(id);
    try {
      await this.appointmentStatusRepository.softRemove({
        id,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneByName(name: string): Promise<AppointmentStatus> {
    const appointmentStatus =
      await this.appointmentStatusRepository.findOne({
        where: { name },
      });

    if (!appointmentStatus) {
      throw new NotFoundException(
        ConstantMessage.APPOINTMENT_STATUS_NOT_FOUND,
      );
    }

    return appointmentStatus;
  }

  async findOneById(id: string): Promise<AppointmentStatus> {
    const appointmentStatus =
      await this.appointmentStatusRepository.findOne({
        where: { id },
      });

    if (!appointmentStatus) {
      throw new NotFoundException(
        ConstantMessage.APPOINTMENT_STATUS_NOT_FOUND,
      );
    }

    return appointmentStatus;
  }
}
