import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../customers./controllers/customers/customers.controller';
import { CustomersService } from '../../services/customers/customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
