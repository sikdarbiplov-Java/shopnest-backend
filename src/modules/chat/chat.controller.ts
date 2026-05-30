import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Create or get conversation
  @Post('conversation')
  getOrCreate(@Body() body: any) {
    return this.chatService.getOrCreateConversation(
      body.customerId,
      body.vendorId,
    );
  }

  // ✅ Send message (text + file) — FIXED TYPE
  @Post('send')
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @UploadedFile() file: any,
    @Body() body: any, // use any for debugging
  ) {
    console.log('BODY:', body);
    console.log('FILE:', file);

    const fileUrl = file ? `/uploads/${file.filename}` : null;

    return this.chatService.sendMessage({
      conversationId: Number(body.conversationId),
      senderId: Number(body.senderId),
      receiverId: Number(body.receiverId),
      message: body.message,
      fileUrl,
      fileType: file?.mimetype,
    });
  }

  // Get messages
  @Get('messages/:conversationId')
  getMessages(@Param('conversationId') id: number) {
    return this.chatService.getMessages(id);
  }
}