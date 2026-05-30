import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from './entity/message.entity';
import { Conversation } from './entity/conversation.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,

    @InjectRepository(Conversation)
    private convoRepo: Repository<Conversation>,
  ) {}

  // Create or get conversation
  async getOrCreateConversation(customerId: number, vendorId: number) {

    if (!customerId || !vendorId) {
      throw new Error('Invalid users');
    }
    let convo = await this.convoRepo.findOne({
      where: { customerId, vendorId },
    });

    if (!convo) {
      convo = this.convoRepo.create({ customerId, vendorId });
      await this.convoRepo.save(convo);
    }

    return convo;
  }

  // Send message
  async sendMessage(data: any) {
    const msg = this.messageRepo.create(data);
    return this.messageRepo.save(msg);
  }

  // Get messages by conversation
  async getMessages(conversationId: number) {
    return this.messageRepo.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }
}