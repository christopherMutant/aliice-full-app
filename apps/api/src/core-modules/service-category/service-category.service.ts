import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServiceCategory,
  ServiceCategoryRelation,
} from '../all-entities';
import { IsNull, Repository } from 'typeorm';
import { ServiceService } from '../service/service.service';
import { ServiceBlockService } from '../service-block/service-block.service';
import { ServiceGroupService } from '../service-group/service-group.service';
import { ServiceCategoryRelationTypes } from '../../shared/types/enums';
import { AppErrorMessages } from '../../constants/app-error-messages';
import {
  ServiceCategoryMemberResponseType,
  ServiceCategoryResponseType,
} from './types/service-category-response.type';
import { ServiceCategoryInListResponseType } from './types/service-category-in-list-response.type';
import { GlobalHelper } from '../../config/app-global-helper';
import { ServiceCategoryQueryListingDto } from './dto/service-category-query.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceCategoryWithPaginatedChildrenType } from './types/single-service-category-paginated-children.type';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
    @InjectRepository(ServiceCategoryRelation)
    private readonly serviceCategoryRelationRepository: Repository<ServiceCategoryRelation>,
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService: ServiceService,
    @Inject(forwardRef(() => ServiceBlockService))
    private readonly serviceBlockService: ServiceBlockService,
    @Inject(forwardRef(() => ServiceGroupService))
    private readonly serviceGroupService: ServiceGroupService,
  ) {}
  async create(
    createServiceCategoryDto: CreateServiceCategoryDto,
  ): Promise<ServiceCategoryResponseType> {
    const members = [];
    for (const member of createServiceCategoryDto.members) {
      const service = await this.serviceService.validateById(member);
      const serviceBlock =
        await this.serviceBlockService.validateById(member);
      const serviceGroup =
        await this.serviceGroupService.validateById(member);

      if (!service && !serviceBlock && !serviceGroup) {
        throw new NotFoundException(
          'One or more service ID, service block ID, or service group ID is/are not found',
        );
      }

      const relation = {
        relatedObject: member,
        relatedType: service
          ? ServiceCategoryRelationTypes.SERVICE
          : serviceBlock
          ? ServiceCategoryRelationTypes.SERVICE_BLOCK
          : ServiceCategoryRelationTypes.SERVICE_GROUP,
      };

      members.push(relation);
    }

    try {
      const serviceCategory =
        await this.serviceCategoryRepository.save({
          ...createServiceCategoryDto,
          serviceCategoryRelations: members,
        });

      return await this.findOne(serviceCategory.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(): Promise<ServiceCategoryInListResponseType[]> {
    const serviceCategories =
      await this.serviceCategoryRepository.find({
        select: {
          id: true,
          name: true,
        },
      });

    return serviceCategories as ServiceCategoryInListResponseType[];
  }

  async findOne(id: string): Promise<ServiceCategoryResponseType> {
    const [serviceCategory] =
      await this.serviceCategoryRepository.query(
        `
        WITH members_table AS (SELECT 
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.id  
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.id 
            ELSE service_groups.id
          END AS id,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.code 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.code 
            ELSE service_groups.code
          END AS code,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.description 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.description 
            ELSE service_groups.description
          END AS description,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.catalogue 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.catalogue 
            ELSE service_groups.catalogue
          END AS catalogue,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.info 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.info 
            ELSE service_groups.info
          END AS info,
          service_category_relations.related_type AS related_type
          FROM service_categories
          LEFT OUTER JOIN service_category_relations 
            ON service_categories.id = service_category_relations.service_category
          LEFT OUTER JOIN services 
            ON service_category_relations.related_object::text = services.id::text
          LEFT OUTER JOIN service_blocks 
            ON service_category_relations.related_object::text = service_blocks.id::text
          LEFT OUTER JOIN service_groups
            ON service_category_relations.related_object::text = service_groups.id::text
          WHERE service_categories.id = '${id}' 
            AND services.deleted_at IS NULL
            AND service_blocks.deleted_at IS NULL
            AND service_groups.deleted_at IS NULL
            AND service_categories.deleted_at IS NULL 
          SELECT service_categories.id AS id, service_categories.name AS name,
          CASE 
            WHEN COUNT(members_table.id) = 0 THEN NULL 
            ELSE json_agg(members_table.*) 
          END
          AS members 
          FROM service_categories, members_table
          WHERE service_categories.id = '${id}' 
          GROUP BY service_categories.id;`,
      );

    return serviceCategory;
  }

  async findOneWithMembers(
    id: string,
    serviceCategoryQueryListingDto?: ServiceCategoryQueryListingDto,
  ): Promise<ServiceCategoryWithPaginatedChildrenType> {
    const validateServiceCategory = await this.findOneByID(id);

    if (validateServiceCategory.name == 'All') {
      const services = await this.serviceService.findAllForCategory(
        serviceCategoryQueryListingDto,
      );
      const serviceCategory = {
        message: ConstantMessage.SERVICE_CATEGORY_FETCHED,
        data: {
          id: validateServiceCategory.id,
          name: validateServiceCategory.name,
          members:
            services.data as ServiceCategoryMemberResponseType[],
        },
        pagination: services.pagination,
      };

      return serviceCategory;
    }

    if (validateServiceCategory.name == 'Blocks') {
      const serviceBlocks =
        await this.serviceBlockService.findAllForCategory(
          serviceCategoryQueryListingDto,
        );
      const serviceCategory = {
        message: ConstantMessage.SERVICE_CATEGORY_FETCHED,
        data: {
          id: validateServiceCategory.id,
          name: validateServiceCategory.name,
          members:
            serviceBlocks.data as ServiceCategoryMemberResponseType[],
        },
        pagination: serviceBlocks.pagination,
      };

      return serviceCategory;
    }

    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceCategoryQueryListingDto.limit,
      serviceCategoryQueryListingDto.offset,
    );

    const limitStatement = limit ? `LIMIT ${limit} ` : '';
    const offsetStatement = offset ? `OFFSET ${offset} ` : '';

    const searchStatement = serviceCategoryQueryListingDto.search
      ? ` AND services.code LIKE '%${serviceCategoryQueryListingDto.search}%' OR service_blocks.code LIKE '%${serviceCategoryQueryListingDto.search}%'`
      : '';

    const [serviceCategory] =
      await this.serviceCategoryRepository.query(
        `
        WITH members_table AS (SELECT 
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.id  
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.id 
            ELSE service_groups.id
          END AS id,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.code 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.code 
            ELSE service_groups.code
          END AS code,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.description 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.description 
            ELSE service_groups.description
          END AS description,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.catalogue 
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.catalogue 
            ELSE service_groups.catalogue
          END AS catalogue,
          CASE 
            WHEN service_category_relations.related_type = 'service' THEN services.info
            WHEN service_category_relations.related_type = 'service block' THEN service_blocks.info 
            ELSE service_groups.info
          END AS info,
          service_category_relations.related_type AS related_type
          FROM service_categories
          LEFT OUTER JOIN service_category_relations 
            ON service_categories.id = service_category_relations.service_category
          LEFT OUTER JOIN services 
            ON service_category_relations.related_object::text = services.id::text
          LEFT OUTER JOIN service_blocks 
            ON service_category_relations.related_object::text = service_blocks.id::text
          LEFT OUTER JOIN service_groups
            ON service_category_relations.related_object::text = service_groups.id::text
          WHERE service_categories.id = '${id}' 
            AND services.deleted_at IS NULL
            AND service_blocks.deleted_at IS NULL
            AND service_groups.deleted_at IS NULL
            AND service_categories.deleted_at IS NULL` +
          searchStatement +
          `),
          member_count AS (
            SELECT COUNT(*) AS count
            FROM members_table
          )
          SELECT service_categories.id AS id, service_categories.name AS name, member_count.count AS count,
          CASE 
            WHEN COUNT(sorted_members_table.id) = 0 THEN NULL 
            ELSE json_agg(sorted_members_table.*) 
          END
          AS members 
          FROM service_categories,
            (SELECT * FROM members_table ORDER BY ${serviceCategoryQueryListingDto.orderBy} ${serviceCategoryQueryListingDto.sort} ` +
          limitStatement +
          offsetStatement +
          `) AS sorted_members_table
          LEFT JOIN member_count ON TRUE
          WHERE service_categories.id = '${id}' 
          GROUP BY service_categories.id, member_count.count;`,
      );

    const count = +serviceCategory.count;
    delete serviceCategory.count;

    return {
      message: ConstantMessage.SERVICE_CATEGORY_FETCHED,
      data: GlobalHelper.convertKeysToCamelCase(
        serviceCategory,
      ) as unknown as ServiceCategoryResponseType,
      pagination: {
        limit,
        offset,
        count,
      },
    };
  }

  async update(
    id: string,
    updateServiceCategoryDto: UpdateServiceCategoryDto,
  ): Promise<void> {
    const serviceCategory = await this.findOneByID(id);

    const members = [];
    for (const member of updateServiceCategoryDto.members) {
      const service = await this.serviceService.validateById(member);
      const serviceBlock =
        await this.serviceBlockService.validateById(member);
      const serviceGroup =
        await this.serviceGroupService.validateById(member);

      if (!service && !serviceBlock && !serviceGroup) {
        throw new NotFoundException(
          'One or more service ID, service block ID, or service group ID is/are not found',
        );
      }

      const relation = {
        relatedObject: member,
        relatedType: service
          ? ServiceCategoryRelationTypes.SERVICE
          : serviceBlock
          ? ServiceCategoryRelationTypes.SERVICE_BLOCK
          : ServiceCategoryRelationTypes.SERVICE_GROUP,
      };

      members.push(relation);
    }

    try {
      await this.serviceCategoryRepository.save({
        ...serviceCategory,
        ...updateServiceCategoryDto,
        serviceCategoryRelations: members,
      });

      await this.removeVoidedRelations();
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const serviceCategory = await this.findOneByID(id);

    try {
      await this.serviceCategoryRepository.softRemove({
        id: serviceCategory.id,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneByID(id: string): Promise<ServiceCategory> {
    const serviceCategory =
      await this.serviceCategoryRepository.findOne({
        where: { id },
      });

    if (!serviceCategory) {
      throw new NotFoundException(
        ConstantMessage.SERVICE_CATEGORY_NOT_FOUND,
      );
    }

    return serviceCategory;
  }

  async removeVoidedRelations(): Promise<void> {
    const voidedRecords =
      await this.serviceCategoryRelationRepository.find({
        where: { serviceCategory: IsNull() },
      });

    for (const voidRecord of voidedRecords) {
      await this.serviceCategoryRelationRepository.remove(voidRecord);
    }
  }
}
