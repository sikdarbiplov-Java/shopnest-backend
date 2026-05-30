import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerId!: number;

  @Column()
  vendorId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}