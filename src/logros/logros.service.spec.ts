import { Test, TestingModule } from '@nestjs/testing';
import { LogrosService } from './logros.service';

describe('LogrosService', () => {
  let service: LogrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogrosService],
    }).compile();

    service = module.get<LogrosService>(LogrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
