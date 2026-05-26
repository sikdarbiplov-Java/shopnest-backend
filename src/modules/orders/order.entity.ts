import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({ unique: true })
  order_number!: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total_amount!: number;

  @Column({ default: 'PENDING' })
  status!: string;

  @Column({ default: 'PENDING' })
  payment_status!: string;

  @Column({ nullable: true })
  shipping_address!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}