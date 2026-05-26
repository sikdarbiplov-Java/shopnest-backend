import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async create(data: Partial<Product>) {
    const product = this.repo.create({
      ...data,
      status: 'ACTIVE',
    });

    return this.repo.save(product);
  }

  async findAll() {
    return this.repo.find({
      where: {
        status: 'ACTIVE',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({
      where: {
        id,
        status: 'ACTIVE',
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: number,
    data: Partial<Product>,
  ) {
    const product = await this.findOne(id);

    Object.assign(product, data);

    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    product.status = 'INACTIVE';

    return this.repo.save(product);
  }
}