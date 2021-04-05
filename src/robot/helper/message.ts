import { MessageType } from './enums';

export type TextMessage = {
  msgtype: MessageType.TEXT;
  text: {
    content: string;
    mentioned_list?: string[];
    mentioned_mobile_list?: string[];
  };
};

export type MarkdownMessage = {
  msgtype: MessageType.MARKDOWN;
  markdown: {
    content: string;
  };
};

export type ImageMessage = {
  msgtype: MessageType.IMAGE;
  image: {
    base64: string;
    md5: string;
  };
};

export type NewsMessage = {
  msgtype: MessageType.NEWS;
  news: {
    articles: {
      title: string;
      url: string;
      description?: string;
      picurl?: string;
    }[];
  };
};

export type FileMessage = {
  msgtype: MessageType.FILE;
  file: {
    media_id: string;
  };
};

export type Message =
  | TextMessage
  | MarkdownMessage
  | ImageMessage
  | NewsMessage
  | FileMessage;
