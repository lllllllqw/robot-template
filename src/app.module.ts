import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`config/.${process.env.NODE_ENV}.env`],
    }),
    RobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logEnvInfo();
  }

  logEnvInfo() {
    this.logger.log('Env config has loaded');
    this.logger.log(`NODE_ENV：${process.env.NODE_ENV}`);
    this.logger.log(`robot hook：${process.env.ROBOT_HOOK_URL}`);
  }
}
