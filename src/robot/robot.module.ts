import { HttpModule, Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';

@Module({
  imports: [HttpModule],
  providers: [RobotService],
  controllers: [RobotController],
})
export class RobotModule {}
