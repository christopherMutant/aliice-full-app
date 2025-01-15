import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefRole } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { RefRoleQueryListingDto } from './dto/role-list.dto';
import { RefRolePaginatedListType } from './types/role-paginated-list.type';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { RefRoleTransformer } from './transformers/role.transformer';
import { RefRoleKeys } from '../../shared/types/enums';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RefRole)
    private readonly refRoleRepository: Repository<RefRole>,
  ) {}

  async rolesList(): Promise<RefRole[]> {
    const refRoles = await this.refRoleRepository.find();

    const sortedRefRoles = refRoles.sort((a: RefRole, b: RefRole) => {
      if (a.key === RefRoleKeys.SUPER_ADMIN) return -1;
      if (b.key === RefRoleKeys.SUPER_ADMIN) return 1;
      return a.name.localeCompare(b.name);
    });

    return sortedRefRoles.map((refRole: RefRole) => {
      return new RefRoleTransformer(refRole);
    });
  }

  async create(createRoleDto: CreateRoleDto): Promise<RefRole> {
    await this.roleByName(createRoleDto.name);

    const key = createRoleDto.name
      .toLocaleLowerCase()
      .replace(/\s+/g, '_');

    const refRole = await this.refRoleRepository.save({
      ...createRoleDto,
      key: key,
    });
    return new RefRoleTransformer(refRole);
  }

  async findAll(
    refRoleQueryListingDto: RefRoleQueryListingDto,
  ): Promise<RefRolePaginatedListType> {
    /**Get default limit and offset if not in dto */
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      refRoleQueryListingDto.limit,
      refRoleQueryListingDto.offset,
    );

    const refRoleEntity = EntityNames.REF_ROLE;

    const queryBuilder = this.refRoleRepository
      .createQueryBuilder(refRoleEntity)
      .skip(offset)
      .take(limit);

    if (refRoleQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${refRoleEntity}.name ILIKE :search`, {
            search: `%${refRoleQueryListingDto.search}%`,
          });
        }),
      );
    }

    const [refroles, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.ROLE_FETCHED,
      pagination: { limit, offset, count },
      data: refroles.map(
        (refrole: RefRole) => new RefRoleTransformer(refrole),
      ),
    };
  }

  async findOne(id: string): Promise<RefRole> {
    const refrole = await this.roleById(id);

    return new RefRoleTransformer(refrole);
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateRoleDto> {
    const roles = await this.refRoleRepository.findOneBy({ id });

    //Checks if the name alread exist
    await this.roleByName(updateRoleDto.name);

    const key = updateRoleDto.name
      .toLocaleLowerCase()
      .replace(/\s+/g, '_');

    Object.assign(roles, {
      ...updateRoleDto,
      key: key,
    });

    return this.refRoleRepository.save(roles);
  }

  async remove(id: string): Promise<void> {
    const roles = await this.roleById(id);
    await this.refRoleRepository.softRemove(roles);
  }

  async roleById(id: string): Promise<RefRole> {
    const foundRefRole = await this.refRoleRepository.findOne({
      where: { id },
    });

    if (!foundRefRole) {
      throw new NotFoundException(ConstantMessage.ROLE_NOT_FOUND);
    }

    return foundRefRole;
  }

  async roleByName(name: string): Promise<void> {
    const roleName = await this.refRoleRepository.findOneBy({
      name: name,
    });

    if (roleName) {
      throw new UnauthorizedException(
        AppErrorMessages.role_name_exist_em,
      );
    }
  }

  async findOneByKey(key: string): Promise<RefRole> {
    const role = await this.refRoleRepository.findOne({
      where: { key },
    });

    if (!role) {
      throw new NotFoundException(ConstantMessage.ROLE_NOT_FOUND);
    }

    return role;
  }
}
