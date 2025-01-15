import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryReferenceDto } from './dto/create-category_reference.dto';
import { UpdateCategoryReferenceDto } from './dto/update-category_reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryReference } from '../all-entities';
import { Brackets, Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { CategoryReferenceTransformer } from './transformers/category-reference.transformer';
import { CategoryReferenceQueryListingDto } from './dto/category-reference-list.dto';
import { GlobalHelper } from '../../config/app-global-helper';
import { EntityNames } from '../../config/entity-names';
import { PaginatedCategoryReferenceType } from './types/category-reference-paginated-list.type';

@Injectable()
export class CategoryReferenceService {
  constructor(
    @InjectRepository(CategoryReference)
    private readonly categoryReferenceRepository: Repository<CategoryReference>,
  ) {}

  async create(
    createCategoryReferenceDto: CreateCategoryReferenceDto,
  ): Promise<CategoryReference> {
    const categoryReference =
      await this.categoryReferenceRepository.save(
        createCategoryReferenceDto,
      );

    return new CategoryReferenceTransformer(categoryReference);
  }

  async findAll(
    categoryReferenceQueryListingDto: CategoryReferenceQueryListingDto,
  ): Promise<PaginatedCategoryReferenceType> {
    const { limit, offset } = GlobalHelper.getPaginationLimitOffSet(
      categoryReferenceQueryListingDto.limit,
      categoryReferenceQueryListingDto.offset,
    );

    const categoryReferenceEntity = EntityNames.CATEGORY_REFERENCE;

    const queryBuilder = this.categoryReferenceRepository
      .createQueryBuilder(categoryReferenceEntity)
      .skip(offset)
      .take(limit);

    if (categoryReferenceQueryListingDto.search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${categoryReferenceEntity}.name ILIKE :search`, {
            search: `%${categoryReferenceQueryListingDto.search}%`,
          }).orWhere(
            `${categoryReferenceEntity}.description ILIKE :search`,
            {
              search: `%${categoryReferenceQueryListingDto.search}%`,
            },
          );
        }),
      );
    }

    const [categoryReferences, count] =
      await queryBuilder.getManyAndCount();
    return {
      message: ConstantMessage.CATEGORY_REFERENCE_FETCHED,
      data: categoryReferences.map(
        (categoryReference: CategoryReference) =>
          new CategoryReferenceTransformer(categoryReference),
      ),
      pagination: { limit, offset, count },
    };
  }

  async freeReferenceCategoryList(): Promise<CategoryReference[]> {
    const categoryReferenceList =
      await this.categoryReferenceRepository.find();
    return categoryReferenceList.map(
      freeReferenceCategory =>
        new CategoryReferenceTransformer(freeReferenceCategory),
    );
  }

  async update(
    id: string,
    updateCategoryReferenceDto: UpdateCategoryReferenceDto,
  ): Promise<void> {
    const categoryReference = await this.categoryReferenceById(id);

    const updatedCategoryReference = {
      ...categoryReference,
      ...updateCategoryReferenceDto,
    };

    await this.categoryReferenceRepository.save(
      updatedCategoryReference,
    );
  }

  async remove(id: string): Promise<void> {
    const categoryReference = await this.categoryReferenceById(id);

    await this.categoryReferenceRepository.softRemove(
      categoryReference,
    );
  }

  async categoryReferenceById(
    id: string,
  ): Promise<CategoryReference> {
    const categoryReference =
      await this.categoryReferenceRepository.findOneBy({ id });

    if (!categoryReference) {
      throw new NotFoundException(
        ConstantMessage.CATEGORY_REFERENCE_NOT_FOUND,
      );
    }

    return categoryReference;
  }
}
