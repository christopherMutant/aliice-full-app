import { Test, TestingModule } from '@nestjs/testing';
import { CategoryPeopleService } from './category_people.service';

describe('CategoryPeopleService', () => {
  let service: CategoryPeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryPeopleService],
    }).compile();

    service = module.get<CategoryPeopleService>(
      CategoryPeopleService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
