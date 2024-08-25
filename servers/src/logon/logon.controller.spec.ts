import { Test, TestingModule } from '@nestjs/testing';
import { LogonController } from './logon.controller';

describe('LogonController', () => {
  let controller: LogonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogonController],
    }).compile();

    controller = module.get<LogonController>(LogonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
