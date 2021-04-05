import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { map, tap } from 'rxjs/operators';
import { MessageType } from './helper/enums';
import {
  Message,
  TextMessage,
  MarkdownMessage,
  ImageMessage,
  NewsMessage,
  FileMessage,
} from './helper/message';

/**
 * Message types see {@link https://work.weixin.qq.com/api/doc/90000/90136/91770#%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B%E5%8F%8A%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F doc}
 */
@Injectable()
export class RobotService {
  constructor(private httpService: HttpService) {}

  private logger = new Logger(RobotService.name);

  private sendMessage(message: Message) {
    return this.httpService
      .post<{
        errcode: number;
        errmsg: string;
      }>(process.env.ROBOT_HOOK_URL, message)
      .pipe(
        tap(() => {
          this.logger.verbose(`Send message: ${message.msgtype}`);
          this.logger.verbose(`message: ${JSON.stringify(message)}`);
        }),
        map((res) => res.data),
      );
  }

  /**
   * scheduled task example
   */
  @Cron('00 09 * * *', {
    utcOffset: 8,
  })
  private sendEveryDayReminder() {
    this.logger.verbose(`Scheduled task "Morning Message" is running`);
    this.sendTextMessage({
      content: 'Good morning',
    }).subscribe();
  }

  /**
   * Example for text message
   */
  sendTextMessage(text: TextMessage['text']) {
    const message: TextMessage = {
      msgtype: MessageType.TEXT,
      text,
    };
    return this.sendMessage(message);
  }

  sendMarkdownMessage(markdown: MarkdownMessage['markdown']) {
    const message: MarkdownMessage = {
      msgtype: MessageType.MARKDOWN,
      markdown,
    };
    return this.sendMessage(message);
  }

  sendImageMessage(image: ImageMessage['image']) {
    const message: ImageMessage = {
      msgtype: MessageType.IMAGE,
      image,
    };
    return this.sendMessage(message);
  }

  sendNewsMessage(news: NewsMessage['news']) {
    const message: NewsMessage = {
      msgtype: MessageType.NEWS,
      news,
    };
    return this.sendMessage(message);
  }

  sendFileMessage(file: FileMessage['file']) {
    const message: FileMessage = {
      msgtype: MessageType.FILE,
      file,
    };
    return this.sendMessage(message);
  }
}
