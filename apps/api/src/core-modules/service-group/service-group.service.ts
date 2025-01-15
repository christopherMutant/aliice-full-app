import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGroup, ServiceGroupRelation } from '../all-entities';
import { IsNull, Repository } from 'typeorm';
import { ServiceService } from '../service/service.service';
import { ServiceBlockService } from '../service-block/service-block.service';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ServicGroupRelationTypes } from '../../shared/types/enums';
import { ServiceGroupResponseType } from './types/service-group-response.type';
import { ServiceGroupListQueryListingDto } from './dto/service-group-list.dto';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceGroupPaginatedListType } from './types/service-group-list.type';

@Injectable()
export class ServiceGroupService {
  constructor(
    @InjectRepository(ServiceGroup)
    private readonly serviceGroupRepository: Repository<ServiceGroup>,
    @InjectRepository(ServiceGroupRelation)
    private readonly serviceGroupRelationRepository: Repository<ServiceGroupRelation>,
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService: ServiceService,
    @Inject(forwardRef(() => ServiceBlockService))
    private readonly serviceBlockService: ServiceBlockService,
  ) {}
  async create(
    createServiceGroupDto: CreateServiceGroupDto,
  ): Promise<ServiceGroupResponseType> {
    // check if code is taken
    if (
      createServiceGroupDto.code &&
      ((await this.serviceService.findOneByCode(
        createServiceGroupDto.code,
      )) ||
        (await this.serviceBlockService.findOneByCode(
          createServiceGroupDto.code,
        )) ||
        (await this.findOneByCode(createServiceGroupDto.code)))
    ) {
      throw new ConflictException('Code already taken');
    }

    const members = [];
    for (const member of createServiceGroupDto.members) {
      const service = await this.serviceService.validateById(member);
      const serviceBlock =
        await this.serviceBlockService.validateById(member);

      if (!service && !serviceBlock) {
        throw new NotFoundException(
          'One or more service ID or service block ID is/are not found',
        );
      }

      const relation = {
        relatedObject: member,
        relatedType: service
          ? ServicGroupRelationTypes.SERVICE
          : ServicGroupRelationTypes.SERVICE_BLOCK,
      };

      members.push(relation);
    }

    try {
      const serviceGroup = await this.serviceGroupRepository.save({
        ...createServiceGroupDto,
        serviceGroupRelations: members,
      });

      return await this.findOne(serviceGroup.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    serviceGroupListQueryListingDto: ServiceGroupListQueryListingDto,
  ): Promise<ServiceGroupPaginatedListType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      serviceGroupListQueryListingDto.limit,
      serviceGroupListQueryListingDto.offset,
    );

    const serviceGroupEntity = EntityNames.SERVICE_GROUP;

    const queryBuilder = this.serviceGroupRepository
      .createQueryBuilder(serviceGroupEntity)
      .select([
        `${serviceGroupEntity}.id`,
        `${serviceGroupEntity}.code`,
        `${serviceGroupEntity}.description`,
        `${serviceGroupEntity}.info`,
        `${serviceGroupEntity}.catalogue`,
      ])
      .skip(offset)
      .take(limit)
      .orderBy(
        `${serviceGroupEntity}.code`,
        serviceGroupListQueryListingDto.sort,
      );

    if (serviceGroupListQueryListingDto.search) {
      queryBuilder.where(`${serviceGroupEntity}.code LIKE :search`, {
        search: `%${serviceGroupListQueryListingDto}.search%`,
      });
    }

    const [serviceGroups, count] =
      await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.SUCCESS,
      pagination: { limit, offset, count },
      data: serviceGroups,
    };
  }

  async findOne(id: string): Promise<ServiceGroupResponseType> {
    //validate servicegroup
    await this.findOneByID(id);

    //pagination not yet implemented
    const [serviceGroup] = await this.serviceGroupRepository
      .query(`SELECT json_build_object(
                'id', service_groups.id,
                'code', service_groups.code,
                'description', service_groups.description,
                'info', service_groups.info,
                'catalogue', service_groups.catalogue,
                'members', CASE 
                    WHEN COUNT(service_group_relations.id) = 0 THEN NULL
                    ELSE json_agg(
                      json_build_object(
                        'relatedObject', json_build_object(
                        'id', CASE 
                          WHEN service_group_relations.related_type = 'service' THEN services.id 
                          ELSE service_blocks.id
                        END, 
                        'code', CASE 
                          WHEN service_group_relations.related_type = 'service' THEN services.code 
                          ELSE service_blocks.code 
                        END,
                        'description', CASE 
                          WHEN service_group_relations.related_type = 'service' THEN services.description 
                          ELSE service_blocks.description 
                        END,
                        'catalogue', CASE 
                          WHEN service_group_relations.related_type = 'service' THEN services.catalogue 
                          ELSE service_blocks.catalogue 
                        END,
                        'info', CASE 
                          WHEN service_group_relations.related_type = 'service' THEN services.info 
                          ELSE service_blocks.info 
                        END
                        ),
                        'relatedType', service_group_relations.related_type
                      )
                    )
                END
            ) AS data
            FROM service_groups
            LEFT OUTER JOIN service_group_relations 
                ON service_groups.id = service_group_relations.service_group
            LEFT OUTER JOIN services 
                ON service_group_relations.related_object::text = services.id::text
            LEFT OUTER JOIN service_blocks 
                ON service_group_relations.related_object::text = service_blocks.id::text
            WHERE service_groups.id = '${id}' 
                AND services.deleted_at IS NULL
                AND service_blocks.deleted_at IS NULL
                AND service_groups.deleted_at IS NULL
            GROUP BY service_groups.id;`);

    return serviceGroup.data as ServiceGroupResponseType;
  }

  async update(
    id: string,
    updateServiceGroupDto: UpdateServiceGroupDto,
  ): Promise<void> {
    const serviceGroup = await this.findOneByID(id);

    if (
      updateServiceGroupDto.code &&
      updateServiceGroupDto.code != serviceGroup.code &&
      ((await this.serviceService.findOneByCode(
        updateServiceGroupDto.code,
      )) ||
        (await this.serviceBlockService.findOneByCode(
          updateServiceGroupDto.code,
        )) ||
        (await this.findOneByCode(updateServiceGroupDto.code)))
    ) {
      throw new ConflictException('Code already taken');
    }

    const members = [];
    for (const member of updateServiceGroupDto.members) {
      const service = await this.serviceService.validateById(member);
      const serviceBlock =
        await this.serviceBlockService.validateById(member);

      if (!service && !serviceBlock) {
        throw new NotFoundException(
          'One or more service ID or service block ID is/are not found',
        );
      }

      const relation = {
        relatedObject: member,
        relatedType: service
          ? ServicGroupRelationTypes.SERVICE
          : ServicGroupRelationTypes.SERVICE_BLOCK,
      };

      members.push(relation);
    }

    try {
      await this.serviceGroupRepository.save({
        ...serviceGroup,
        ...updateServiceGroupDto,
        serviceGroupRelations: members,
      });

      await this.removeVoidedRelations();
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const serviceGroup = await this.findOneByID(id);

    try {
      await this.serviceGroupRepository.softRemove({
        id: serviceGroup.id,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findOneByCode(code: string): Promise<ServiceGroup> {
    const serviceGroup = await this.serviceGroupRepository.findOne({
      where: { code },
    });

    return serviceGroup;
  }

  async findOneByID(id: string): Promise<ServiceGroup> {
    const serviceGroup = await this.serviceGroupRepository.findOne({
      where: { id },
    });

    if (!serviceGroup) {
      throw new NotFoundException(
        ConstantMessage.SERVICE_GROUP_NOT_FOUND,
      );
    }

    return serviceGroup;
  }

  async validateById(id: string): Promise<ServiceGroup> {
    const serviceGroup = await this.serviceGroupRepository.findOne({
      where: { id },
    });

    return serviceGroup;
  }

  async removeVoidedRelations(): Promise<void> {
    const voidedRecords =
      await this.serviceGroupRelationRepository.find({
        where: { serviceGroup: IsNull() },
      });

    for (const voidRecord of voidedRecords) {
      await this.serviceGroupRelationRepository.remove(voidRecord);
    }
  }
}
