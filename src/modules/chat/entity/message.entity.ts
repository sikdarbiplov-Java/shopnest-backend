import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  conversationId!: number;

  @Column()
  senderId!: number;

  @Column()
  receiverId!: number;

  @Column({ nullable: true })
  message!: string;

  @Column({ nullable: true })
  fileUrl!: string;

  @Column({ nullable: true })
  fileType!: string;

  @CreateDateColumn()
  createdAt!: Date;
}