import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { PermissionTransformer } from './transformers/permission.transformer';
import { PermissionQueryListingDto } from './dto/permission-list.dto';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { ConstantMessage } from '../../constants/constant-messages';
import { PermissionPaginatedListType } from './types/permission-paginated-list.type';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const key = createPermissionDto.name
      .toLocaleLowerCase()
      .replace(/\s+/g, '_');

    const permission = await this.permissionRepository.save({
      ...createPermissionDto,
      key: key,
    });

    return new PermissionTransformer(permission);
  }

  async findAll(
    permissionQueryListingDto: PermissionQueryListingDto,
  ): Promise<PermissionPaginatedListType> {
    /**Get default limit and offset if not in dto */
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      permissionQueryListingDto.limit,
      permissionQueryListingDto.offset,
    );

    const permissionRoleEntity = EntityNames.PERMISSION;

    const queryBuilder = this.permissionRepository
      .createQueryBuilder(permissionRoleEntity)
      .skip(offset)
      .take(limit);

    if (permissionQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${permissionRoleEntity}.name ILIKE :search`, {
            search: `%${permissionQueryListingDto.search}%`,
          });
        }),
      );
    }

    const [permissions, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.PERMISSION_FETCHED,
      pagination: { limit, offset, count },
      data: permissions.map(
        (permission: Permission) =>
          new PermissionTransformer(permission),
      ),
    };
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionById(id);

    return new PermissionTransformer(permission);
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdatePermissionDto> {
    const permision = await this.permissionById(id);

    const key = updatePermissionDto.name
      .toLocaleLowerCase()
      .replace(/\s+/g, '_');

    Object.assign(permision, {
      ...permision,
      key: key,
    });
    return this.permissionRepository.save(permision);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.permissionById(id);
    await this.permissionRepository.softRemove(permission);
  }

  async permissionById(id: string): Promise<Permission> {
    const foundPermission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!foundPermission) {
      throw new NotFoundException(
        ConstantMessage.PERMISSION_NOT_FOUND,
      );
    }

    return foundPermission;
  }
}
