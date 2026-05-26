import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';

@Entity('cart_items')
export class CartItem {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cart_id!: number;

    @Column()
    product_id!: number;

    @Column({ default: 1 })
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({
        type: 'varchar',
        default: 'ACTIVE'
    })
    status!: string;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cart_id' })
    cart!: Cart;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}