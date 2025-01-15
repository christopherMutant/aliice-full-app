import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBlockController } from './service-block.controller';
import { ServiceBlockService } from './service-block.service';

describe('ServiceBlockController', () => {
  let controller: ServiceBlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceBlockController],
      providers: [ServiceBlockService],
    }).compile();

    controller = module.get<ServiceBlockController>(
      ServiceBlockController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
