import { Test, TestingModule } from '@nestjs/testing';
import { BankdetailsController } from './bank-details.controller';
import { BankDetailsService } from './bank-details.service';

describe('BankdDetailsController', () => {
  let controller: BankdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankdetailsController],
      providers: [BankDetailsService],
    }).compile();

    controller = module.get<BankdetailsController>(
      BankdetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
