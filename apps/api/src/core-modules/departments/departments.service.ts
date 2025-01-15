import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { DepartmentTransformer } from './transformers/department.transformer';
import { DepartmentResponseType } from './types/department-response.type';
import { DepartmentPaginatedListType } from './types/department-paginated-list.type';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { DepartmentQueryListingDto } from './dto/department-list.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async departmentsList(): Promise<Department[]> {
    const departments = await this.departmentRepository.find();
    return departments.map(
      (department: Department) =>
        new DepartmentTransformer(department),
    );
  }

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentResponseType> {
    await this.departmentByName(createDepartmentDto.name);

    const department = await this.departmentRepository.save(
      createDepartmentDto,
    );

    return new DepartmentTransformer(department);
  }

  async findAll(
    departmentQueryListingDto: DepartmentQueryListingDto,
  ): Promise<DepartmentPaginatedListType> {
    /**Get default limit and offset if not in dto */
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      departmentQueryListingDto.limit,
      departmentQueryListingDto.offset,
    );

    const departmentEntity = EntityNames.DEPARTMENTS;

    const queryBuilder = this.departmentRepository
      .createQueryBuilder(departmentEntity)
      .skip(offset)
      .take(limit)
      .orderBy(
        `${departmentEntity}.${departmentQueryListingDto.orderBy}`,
        departmentQueryListingDto.sort,
      ); // Add your order by conditions here

    if (departmentQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${departmentEntity}.name ILIKE :search`, {
            search: `%${departmentQueryListingDto.search}%`,
          });
        }),
      );
    }

    const [departments, count] = await queryBuilder.getManyAndCount();

    return {
      message: ConstantMessage.DEPARTMENT_FETCHED,
      pagination: { limit, offset, count },
      data: departments.map(
        (department: Department) =>
          new DepartmentTransformer(department),
      ),
    };
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    return new DepartmentTransformer(department);
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<void> {
    const department = await this.departmentRepository.findOneBy({
      id,
    });

    Object.assign(department, updateDepartmentDto);
    await this.departmentRepository.save(department);
  }

  async remove(id: string): Promise<void> {
    const department = await this.departmentById(id);

    await this.departmentRepository.softRemove(department);
  }

  async departmentById(id: string): Promise<Department> {
    const foundDepartment = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!foundDepartment) {
      throw new NotFoundException(
        ConstantMessage.DEPARTMENT_NOT_FOUND,
      );
    }

    return foundDepartment;
  }

  async departmentByName(name: string): Promise<Department> {
    const foundDepartment = await this.departmentRepository.findOne({
      where: { name },
    });

    if (foundDepartment) {
      throw new ConflictException(ConstantMessage.DEPARTMENT_EXIST);
    }

    return foundDepartment;
  }
}
