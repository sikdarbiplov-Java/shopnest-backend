import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import { Message } from './entity/message.entity';
import { Conversation } from './entity/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}