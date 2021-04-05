import { Controller, Logger, Post } from '@nestjs/common';

import { RobotService } from './robot.service';

@Controller('robot')
export class RobotController {
  constructor(private robotService: RobotService) {}

  private logger = new Logger(RobotController.name);

  @Post('/text')
  senTextMessage() {
    return this.robotService.sendTextMessage({
      content: 'Hello world',
    });
  }

  @Post('/markdown')
  sendMarkdownMessage() {
    return this.robotService.sendMarkdownMessage({
      content: `**Hello world**`,
    });
  }

  @Post('/image')
  sendImageMessage() {
    return this.robotService.sendImageMessage({
      base64: 'DATA',
      md5: 'MD5',
    });
  }

  @Post('/news')
  sendNewsMessage() {
    return this.robotService.sendNewsMessage({
      articles: [
        {
          title: 'Hello world',
          url: 'https://work.weixin.qq.com/api/doc/90000/90136/91770',
        },
      ],
    });
  }

  @Post('/file')
  sendFileMessage() {
    return this.robotService.sendFileMessage({
      media_id: 'media_hash',
    });
  }
}
