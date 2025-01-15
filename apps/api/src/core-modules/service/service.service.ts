import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  CreateServiceDto,
  ServiceCatalogueForService,
} from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../all-entities';
import { Repository } from 'typeorm';
import {
  ServiceCatalogue,
  ServiceCategoryRelationTypes,
} from '../../shared/types/enums';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ServiceResponseType } from './types/service-response.type';
import { ServiceListQueryListingDto } from './dto/service-list.dto';
import { EntityNames } from '../../config/entity-names';
import { GlobalHelper } from '../../config/app-global-helper';
import { ServicePaginatedListType } from './types/service-list.type';
import { ServiceBlockService } from '../service-block/service-block.service';
import { ServiceCategoryQueryListingDto } from '../service-category/dto/service-category-query.dto';
import { ServiceCategoryMemberResponseType } from '../service-category/types/service-category-response.type';
import { ServicePaginatedListForServiceCategoryType } from './types/service-list-for-service-category.type';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @Inject(forwardRef(() => ServiceBlockService))
    private readonly serviceBlockService: ServiceBlockService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseType> {
    if (
      (await this.findOneByCode(createServiceDto.code)) ||
      (await this.serviceBlockService.findOneByCode(
        createServiceDto.code,
      ))
    ) {
      throw new ConflictException('Service code already taken');
    }

    // setting default quantity and point value to 1 if they are not provided by the user
    const quantity = createServiceDto.quantity || 1;
    const pointValue = createServiceDto.pointValue || 1;

    let catalogue: ServiceCatalogue;
    switch (createServiceDto.catalogue) {
      case ServiceCatalogueForService.TARMED:
        catalogue = ServiceCatalogue.TARMED;
        break;

      case ServiceCatalogueForService.CUSTOM:
        catalogue = ServiceCatalogue.CUSTOM;
        break;

      // article will be the default value
      default:
        catalogue = ServiceCatalogue.ARTICLE;
        break;
    }

    try {
      const service = await this.serviceRepository.save({
        ...createServiceDto,
        quantity,
        pointValue,
        catalogue,
      });

      return await this.findOne(service.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    serviceListQueryListingDto: ServiceListQueryListingDto,
  ): Promise<ServicePaginatedListType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceListQueryListingDto.limit,
      serviceListQueryListingDto.offset,
    );
    const serviceEntity = EntityNames.SERVICE;

    const queryBuilder = this.serviceRepository
      .createQueryBuilder(serviceEntity)
      .select([
        `${serviceEntity}.id`,
        `${serviceEntity}.code`,
        `${serviceEntity}.description`,
        `${serviceEntity}.tarrifPoint`,
        `${serviceEntity}.info`,
        `${serviceEntity}.outOfBusiness`,
        `${serviceEntity}.discountCategory`,
        `${serviceEntity}.typeOfCompulsoryInsurance`,
        `${serviceEntity}.nonMandatoryService`,
        `${serviceEntity}.quantity`,
        `${serviceEntity}.catalogue`,
        `${serviceEntity}.pce`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        `${serviceEntity}.code`,
        serviceListQueryListingDto.sort,
      );

    if (serviceListQueryListingDto.search) {
      queryBuilder.where(`${serviceEntity}.code LIKE :search`, {
        search: `%${serviceListQueryListingDto}.search%`,
      });
    }

    const [services, count] = await queryBuilder.getManyAndCount();
    return {
      message: ConstantMessage.SUCCESS,
      pagination: { limit, offset, count },
      data: services,
    };
  }

  async findOne(id: string): Promise<ServiceResponseType> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      select: {
        id: true,
        code: true,
        referenceService: true,
        description: true,
        side: true,
        nonMandatoryService: true,
        quantity: true,
        tarrifPoint: true,
        pointValue: true,
        vat: true,
        info: true,
        catalogue: true,
        outOfBusiness: true,
        discountCategory: true,
        typeOfCompulsoryInsurance: true,
        pce: true,
      },
    });

    if (!service) {
      throw new NotFoundException(ConstantMessage.SERVICE_NOT_FOUND);
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<void> {
    const service = await this.findOne(id);

    const pointValue =
      updateServiceDto.pointValue || service.pointValue;
    const tarrifPoint =
      updateServiceDto.tarrifPoint || service.tarrifPoint;
    const quantity = updateServiceDto.quantity || service.quantity;
    const total = pointValue * tarrifPoint * quantity;
    const code = service.code;

    let catalogue: ServiceCatalogue;
    switch (updateServiceDto.catalogue) {
      case ServiceCatalogueForService.ARTICLE:
        catalogue = ServiceCatalogue.ARTICLE;
        break;

      case ServiceCatalogueForService.TARMED:
        catalogue = ServiceCatalogue.TARMED;
        break;

      case ServiceCatalogueForService.CUSTOM:
        catalogue = ServiceCatalogue.CUSTOM;
        break;

      default:
        catalogue = service.catalogue;
        break;
    }

    try {
      await this.serviceRepository.save({
        ...service,
        ...updateServiceDto,
        code,
        quantity,
        tarrifPoint,
        pointValue,
        total,
        catalogue,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);

    try {
      //clearing service code first before deleting
      await this.serviceRepository.save({
        id: service.id,
        code: null,
      });

      await this.serviceRepository.softRemove({ id: service.id });

      //delete relations here
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneByCode(code: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { code },
    });

    return service;
  }

  async validateById(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id },
    });

    return service;
  }

  async findAllForCategory(
    serviceCategoryQueryListingDto: ServiceCategoryQueryListingDto,
  ): Promise<ServicePaginatedListForServiceCategoryType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceCategoryQueryListingDto.limit,
      serviceCategoryQueryListingDto.offset,
    );
    const serviceEntity = EntityNames.SERVICE;

    const queryBuilder = this.serviceRepository
      .createQueryBuilder(serviceEntity)
      .select([
        `${serviceEntity}.id`,
        `${serviceEntity}.code`,
        `${serviceEntity}.description`,
        `${serviceEntity}.catalogue`,
        `${serviceEntity}.info`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        serviceCategoryQueryListingDto.orderBy,
        serviceCategoryQueryListingDto.sort,
      );

    if (serviceCategoryQueryListingDto.search) {
      queryBuilder.where(`${serviceEntity}.code LIKE :search`, {
        search: `%${serviceCategoryQueryListingDto.search}%`,
      });
    }

    const [services, count] = await queryBuilder.getManyAndCount();
    return {
      message: ConstantMessage.SUCCESS,
      pagination: { limit, offset, count },
      data: services.map(service => {
        return {
          ...service,
          relatedType: ServiceCategoryRelationTypes.SERVICE,
        } as ServiceCategoryMemberResponseType;
      }),
    };
  }
}
