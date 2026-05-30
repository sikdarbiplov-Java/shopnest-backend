export class SendMessageDto {
  conversationId!: number;
  senderId!: number;
  receiverId!: number;
  message?: string;
}