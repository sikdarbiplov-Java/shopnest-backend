export interface ChatMessage {
  id: number;
  text: string;
  file: string | null;
  fileType: 'image' | 'video' | null;
  createdAt: Date;
}