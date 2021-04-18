import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RobotService],
    }).compile();

    service = module.get<RobotService>(RobotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
