import { Test, TestingModule } from '@nestjs/testing';
import { CategoryPeopleController } from './category_people.controller';
import { CategoryPeopleService } from './category_people.service';

describe('CategoryPeopleController', () => {
  let controller: CategoryPeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryPeopleController],
      providers: [CategoryPeopleService],
    }).compile();

    controller = module.get<CategoryPeopleController>(
      CategoryPeopleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
