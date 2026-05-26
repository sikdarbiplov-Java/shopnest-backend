import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('products')
export class Product extends BaseEntity {

  @Column()
  name!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    default: 0,
  })
  stock!: number;

  @Column({
    type: 'varchar',
    default: 'ACTIVE',
  })
  status!: string;
}