import { Test, TestingModule } from '@nestjs/testing';
import { LogrosController } from './logros.controller';

describe('LogrosController', () => {
  let controller: LogrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogrosController],
    }).compile();

    controller = module.get<LogrosController>(LogrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
