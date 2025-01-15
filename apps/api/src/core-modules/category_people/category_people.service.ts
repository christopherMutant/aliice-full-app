import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryPersonDto } from './dto/create-category_person.dto';
import { UpdateCategoryPersonDto } from './dto/update-category_person.dto';
import { CategoryPeople } from '../all-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryPeopleTransformer } from './transformers/category-people.transformer';
import { ConstantMessage } from '../../constants/constant-messages';

@Injectable()
export class CategoryPeopleService {
  constructor(
    @InjectRepository(CategoryPeople)
    private readonly categoryPeopleRepository: Repository<CategoryPeople>,
  ) {}

  async create(
    createCategoryPersonDto: CreateCategoryPersonDto,
  ): Promise<CategoryPeople> {
    const categoryPoeple = await this.categoryPeopleRepository.save(
      createCategoryPersonDto,
    );

    return new CategoryPeopleTransformer(categoryPoeple);
  }

  async categoryPeopleList(): Promise<CategoryPeople[]> {
    const categoryPeople = await this.categoryPeopleRepository.find();
    return categoryPeople;
  }

  async update(
    id: string,
    updateCategoryPersonDto: UpdateCategoryPersonDto,
  ): Promise<void> {
    const categoryPeople = await this.categorPeopleById(id);

    const updatedCategoryPeople = {
      ...categoryPeople,
      ...updateCategoryPersonDto,
    };

    await this.categoryPeopleRepository.save(updatedCategoryPeople);
  }

  async remove(id: string): Promise<void> {
    const categoryPeople = await this.categorPeopleById(id);

    await this.categoryPeopleRepository.softRemove(categoryPeople);
  }

  async categorPeopleById(id: string): Promise<CategoryPeople> {
    const categoryPeople =
      await this.categoryPeopleRepository.findOneBy({ id });

    if (!categoryPeople) {
      throw new NotFoundException(
        ConstantMessage.CATEGORY_PEOPLE_NOT_FOUND,
      );
    }

    return categoryPeople;
  }
}
