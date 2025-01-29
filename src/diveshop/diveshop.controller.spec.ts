import { Test, TestingModule } from '@nestjs/testing';
import { DiveshopController } from './diveshop.controller';

describe('DiveshopController', () => {
  let controller: DiveshopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiveshopController],
    }).compile();

    controller = module.get<DiveshopController>(DiveshopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
