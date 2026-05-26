import { Injectable } from '@nestjs/common';
import { ChatMessage } from './chat.types';

@Injectable()
export class ChatService {
  private messages: ChatMessage[] = [];

  sendMessage(text: string, file?: any): ChatMessage {
    const msg: ChatMessage = {
      id: Date.now(),
      text: text || '',
      file: file ? file.filename : null,
      fileType: file?.mimetype?.includes('video')
        ? 'video'
        : file
        ? 'image'
        : null,
      createdAt: new Date(),
    };

    this.messages.push(msg);
    return msg;
  }

  getMessages(): ChatMessage[] {
    return this.messages;
  }
}