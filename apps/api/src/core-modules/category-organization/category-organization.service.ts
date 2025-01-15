import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryOrganizationDto } from './dto/create-category-organization.dto';
import { UpdateCategoryOrganizationDto } from './dto/update-category-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryOrganization } from '../all-entities';
import { Repository } from 'typeorm';
import { CategoryOrganizationTransfomer } from './transformers/category-organization.transformer';
import { ConstantMessage } from '../../constants/constant-messages';

@Injectable()
export class CategoryOrganizationService {
  constructor(
    @InjectRepository(CategoryOrganization)
    private readonly categoryOrganizationRepository: Repository<CategoryOrganization>,
  ) {}

  async create(
    createCategoryOrganizationDto: CreateCategoryOrganizationDto,
  ): Promise<CategoryOrganization> {
    const categoryOrganization =
      await this.categoryOrganizationRepository.save(
        createCategoryOrganizationDto,
      );

    return new CategoryOrganizationTransfomer(categoryOrganization);
  }

  async categoryOrganizationList(): Promise<CategoryOrganization[]> {
    const categoryOrganizations =
      await this.categoryOrganizationRepository.find();
    return categoryOrganizations;
  }

  async update(
    id: string,
    updateCategoryOrganizationDto: UpdateCategoryOrganizationDto,
  ): Promise<void> {
    const categoryOrganization = await this.categoryOrganizationById(
      id,
    );

    const updatedCategoryOrganization = {
      ...categoryOrganization,
      ...updateCategoryOrganizationDto,
    };

    await this.categoryOrganizationRepository.save(
      updatedCategoryOrganization,
    );
  }

  async remove(id: string): Promise<void> {
    const categoryOrganization = await this.categoryOrganizationById(
      id,
    );

    await this.categoryOrganizationRepository.softRemove(
      categoryOrganization,
    );
  }

  async categoryOrganizationById(
    id: string,
  ): Promise<CategoryOrganization> {
    const categoryOrganization =
      await this.categoryOrganizationRepository.findOneBy({ id });

    if (!categoryOrganization) {
      throw new NotFoundException(
        ConstantMessage.CATEGORY_ORGANIZATION_NOT_FOUND,
      );
    }

    return categoryOrganization;
  }
}
