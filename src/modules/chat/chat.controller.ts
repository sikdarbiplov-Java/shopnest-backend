import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @UseInterceptors(FileInterceptor('file'))
  send(
    @UploadedFile() file: any,
    @Body() body: SendMessageDto,
  ) {
    return this.chatService.sendMessage(body.text, file);
  }

  @Get('messages')
  getAll() {
    return this.chatService.getMessages();
  }
}