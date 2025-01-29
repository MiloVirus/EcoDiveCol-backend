import { Test, TestingModule } from '@nestjs/testing';
import { DiveshopService } from './diveshop.service';

describe('DiveshopService', () => {
  let service: DiveshopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiveshopService],
    }).compile();

    service = module.get<DiveshopService>(DiveshopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
