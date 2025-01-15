import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateAppointmentCategoryDto } from './dto/create-appointment_category.dto';
import { UpdateAppointmentCategoryDto } from './dto/update-appointment_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentCategory } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppointmentCategoryQueryListingDto } from './dto/appointment-category-list.dto';
import { EntityNames } from '../../config/entity-names';
import { GlobalHelper } from '../../config/app-global-helper';
import { AppointmentCategoryResponseType } from './types/appointment-category.type';
import { AppointmentCategoryTransformer } from './transformer/appointment-category.transformer';
import { PaginatedAppointmentCategoryType } from './types/appointment-category-paginated.type';
import { AppointmentCategoryInListResponseType } from './types/appointment-category-in-list.type';
import { AppointmentCategoryInListTransformer } from './transformer/appointment-category-in-list.transformer';

@Injectable()
export class AppointmentCategoryService {
  constructor(
    @InjectRepository(AppointmentCategory)
    private readonly appointmentCategoryRepository: Repository<AppointmentCategory>,
  ) {}

  async create(
    createAppointmentCategoryDto: CreateAppointmentCategoryDto,
  ): Promise<AppointmentCategoryResponseType> {
    try {
      const createAppointmentCategory =
        await this.appointmentCategoryRepository.save({
          ...createAppointmentCategoryDto,
        });
      return await this.findOne(createAppointmentCategory.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    appointmentCategoryQueryListingDto: AppointmentCategoryQueryListingDto,
  ): Promise<PaginatedAppointmentCategoryType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      appointmentCategoryQueryListingDto.limit,
      appointmentCategoryQueryListingDto.offset,
    );

    const appointmentCategoryEntity =
      EntityNames.APPOINTMENT_CATEGORY;

    const queryBuilder = this.appointmentCategoryRepository
      .createQueryBuilder(appointmentCategoryEntity)
      .skip(offset)
      .take(limit)
      .orderBy(`${appointmentCategoryEntity}.name`);

    if (appointmentCategoryQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(
            `${appointmentCategoryEntity}.name ILIKE :search`,
            {
              search: `%${appointmentCategoryQueryListingDto.search}%`,
            },
          );
        }),
      );
    }

    const [appointmentCategories, count] =
      await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.APPOINTMENT_CATEGORY_FETCHED,
      data: appointmentCategories.map(
        category => new AppointmentCategoryTransformer(category),
      ),
      pagination: { limit, offset, count },
    };
  }

  async findAllList(): Promise<
    AppointmentCategoryInListResponseType[]
  > {
    const appointmentCategories =
      await this.appointmentCategoryRepository.find();
    return appointmentCategories.map(
      category => new AppointmentCategoryInListTransformer(category),
    );
  }

  async findOne(
    id: string,
  ): Promise<AppointmentCategoryResponseType> {
    const appointmentCategory =
      await this.appointmentCategoryRepository.findOne({
        where: { id },
      });

    if (!appointmentCategory) {
      throw new NotFoundException(
        ConstantMessage.APPOINTMENT_CATEGORY_NOT_FOUND,
      );
    }

    return new AppointmentCategoryTransformer(appointmentCategory);
  }

  async update(
    id: string,
    updateAppointmentCategoryDto: UpdateAppointmentCategoryDto,
  ): Promise<void> {
    await this.findOne(id);
    try {
      await this.appointmentCategoryRepository.save({
        id,
        ...updateAppointmentCategoryDto,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    try {
      await this.appointmentCategoryRepository.softRemove({
        id,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
