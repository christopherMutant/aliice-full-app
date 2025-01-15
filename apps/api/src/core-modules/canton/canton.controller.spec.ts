import { Test, TestingModule } from '@nestjs/testing';
import { CantonController } from './canton.controller';
import { CantonService } from './canton.service';

describe('CantonController', () => {
  let controller: CantonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CantonController],
      providers: [CantonService],
    }).compile();

    controller = module.get<CantonController>(CantonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
