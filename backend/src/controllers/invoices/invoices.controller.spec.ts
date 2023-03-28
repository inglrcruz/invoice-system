import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from '../../invoices./controllers/invoices/invoices.controller';
import { InvoicesService } from '../../services/invoices/invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [InvoicesService],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
