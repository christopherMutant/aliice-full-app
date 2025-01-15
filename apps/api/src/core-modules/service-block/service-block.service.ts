import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateServiceBlockDto } from './dto/create-service-block.dto';
import { UpdateServiceBlockDto } from './dto/update-service-block.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBlock } from '../all-entities';
import { Repository } from 'typeorm';
import { ServiceService } from '../service/service.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ServiceBlockListQueryListingDto } from './dto/service-block-list.dto';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceBlockResponseType } from './types/service-block-response.type';
import { ServiceBlockPaginatedListType } from './types/service-block-list.type';
import { ServiceCategoryQueryListingDto } from '../service-category/dto/service-category-query.dto';
import { ServiceCategoryRelationTypes } from '../../shared/types/enums';
import { ServiceBlockPaginatedListForServiceCategoryType } from './types/service-block-list-for-service-category.type';
import { ServiceCategoryMemberResponseType } from '../service-category/types/service-category-response.type';

@Injectable()
export class ServiceBlockService {
  constructor(
    @InjectRepository(ServiceBlock)
    private readonly serviceBlockRepository: Repository<ServiceBlock>,
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService: ServiceService,
  ) {}

  async create(
    createServiceBlockDto: CreateServiceBlockDto,
  ): Promise<ServiceBlockResponseType> {
    // check if code is taken
    if (
      (await this.findOneByCode(createServiceBlockDto.code)) ||
      (await this.serviceService.findOneByCode(
        createServiceBlockDto.code,
      ))
    ) {
      throw new ConflictException('Code already taken');
    }

    const services = [];
    // find each service based on the given array of service IDs
    for (const serviceID of createServiceBlockDto.services) {
      const service = await this.serviceService.findOne(serviceID);
      services.push(service);
    }

    try {
      const serviceBlock = await this.serviceBlockRepository.save({
        ...createServiceBlockDto,
        services,
      });

      return await this.findOne(serviceBlock.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    serviceBlockListQueryListingDto: ServiceBlockListQueryListingDto,
  ): Promise<ServiceBlockPaginatedListType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceBlockListQueryListingDto.limit,
      serviceBlockListQueryListingDto.offset,
    );

    const serviceBlockEntity = EntityNames.SERVICE_BLOCK;

    const queryBuilder = this.serviceBlockRepository
      .createQueryBuilder(serviceBlockEntity)
      .select([
        `${serviceBlockEntity}.id`,
        `${serviceBlockEntity}.code`,
        `${serviceBlockEntity}.description`,
        `${serviceBlockEntity}.catalogue`,
        `${serviceBlockEntity}.pce`,
        `${serviceBlockEntity}.info`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        serviceBlockListQueryListingDto.orderBy,
        serviceBlockListQueryListingDto.sort,
      );

    if (serviceBlockListQueryListingDto.search) {
      queryBuilder.where(`${serviceBlockEntity}.code LIKE :search`, {
        search: `%${serviceBlockListQueryListingDto}.search%`,
      });
    }

    const [serviceBlocks, count] =
      await queryBuilder.getManyAndCount();
    return {
      message: ConstantMessage.SUCCESS,
      pagination: { limit, offset, count },
      data: serviceBlocks,
    };
  }

  async findOne(id: string): Promise<ServiceBlockResponseType> {
    const serviceBlock = await this.serviceBlockRepository.findOne({
      where: { id },
      relations: {
        services: true,
      },
      select: {
        id: true,
        code: true,
        description: true,
        catalogue: true,
        pce: true,
        info: true,
        services: {
          id: true,
          code: true,
          description: true,
          tarrifPoint: true,
          info: true,
          outOfBusiness: true,
          discountCategory: true,
          typeOfCompulsoryInsurance: true,
          quantity: true,
          catalogue: true,
          pce: true,
        },
      },
      order: { services: { code: 'ASC' } },
    });

    if (!serviceBlock) {
      throw new NotFoundException(
        ConstantMessage.SERVICE_BLOCK_NOT_FOUND,
      );
    }

    return serviceBlock;
  }

  async update(
    id: string,
    updateServiceBlockDto: UpdateServiceBlockDto,
  ): Promise<void> {
    const serviceBlock = await this.findOne(id);

    const services = [];

    for (const serviceID of updateServiceBlockDto.services) {
      const service = await this.serviceService.findOne(serviceID);
      services.push(service);
    }

    try {
      await this.serviceBlockRepository.save({
        ...serviceBlock,
        ...updateServiceBlockDto,
        services,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const serviceBlock = await this.findOne(id);

    try {
      await this.serviceBlockRepository.softRemove({
        id: serviceBlock.id,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneByCode(code: string): Promise<ServiceBlock> {
    const serviceBlock = await this.serviceBlockRepository.findOne({
      where: { code },
    });

    return serviceBlock;
  }

  async validateById(id: string): Promise<ServiceBlock> {
    const serviceBlock = await this.serviceBlockRepository.findOne({
      where: { id },
    });

    return serviceBlock;
  }

  async findAllForCategory(
    serviceCategoryQueryListingDto: ServiceCategoryQueryListingDto,
  ): Promise<ServiceBlockPaginatedListForServiceCategoryType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceCategoryQueryListingDto.limit,
      serviceCategoryQueryListingDto.offset,
    );

    const serviceBlockEntity = EntityNames.SERVICE_BLOCK;

    const queryBuilder = this.serviceBlockRepository
      .createQueryBuilder(serviceBlockEntity)
      .select([
        `${serviceBlockEntity}.id`,
        `${serviceBlockEntity}.code`,
        `${serviceBlockEntity}.description`,
        `${serviceBlockEntity}.catalogue`,
        `${serviceBlockEntity}.info`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        serviceCategoryQueryListingDto.orderBy,
        serviceCategoryQueryListingDto.sort,
      );

    if (serviceCategoryQueryListingDto.search) {
      queryBuilder.where(`${serviceBlockEntity}.code LIKE :search`, {
        search: `%${serviceCategoryQueryListingDto.search}%`,
      });
    }

    const [serviceBlocks, count] =
      await queryBuilder.getManyAndCount();
    return {
      message: ConstantMessage.SUCCESS,
      pagination: { limit, offset, count },
      data: serviceBlocks.map(servicBlock => {
        return {
          ...servicBlock,
          relatedType: ServiceCategoryRelationTypes.SERVICE_BLOCK,
        } as ServiceCategoryMemberResponseType;
      }),
    };
  }
}
