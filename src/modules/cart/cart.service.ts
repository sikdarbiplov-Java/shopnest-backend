import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
  ) {}

  async getOrCreateCart(userId: number) {
    let cart = await this.cartRepo.findOne({
      where: {
        user_id: userId,
        status: 'ACTIVE',
      },
    });

    if (!cart) {
      cart = this.cartRepo.create({
        user_id: userId,
        status: 'ACTIVE',
      });

      await this.cartRepo.save(cart);
    }

    return cart;
  }

  async addToCart(userId: number, body: any) {
    const cart = await this.getOrCreateCart(userId);

    const oldItem = await this.cartItemRepo.findOne({
      where: {
        cart_id: cart.id,
        product_id: body.product_id,
        status: 'ACTIVE',
      },
    });

    if (oldItem) {
      oldItem.quantity += body.quantity;
      return this.cartItemRepo.save(oldItem);
    }

    const item = this.cartItemRepo.create({
      cart_id: cart.id,
      product_id: body.product_id,
      quantity: body.quantity,
      price: body.price,
      status: 'ACTIVE',
    });

    return this.cartItemRepo.save(item);
  }

  async getCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);

    return this.cartItemRepo.find({
      where: {
        cart_id: cart.id,
        status: 'ACTIVE',
      },
      relations: ['product'],
    });
  }

  async removeItem(id: number) {
    const item = await this.cartItemRepo.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    item.status = 'REMOVED';

    return this.cartItemRepo.save(item);
  }

  async updateQty(id: number, qty: number) {
    const item = await this.cartItemRepo.findOne({
      where: {
        id,
        status: 'ACTIVE',
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    item.quantity = qty;

    return this.cartItemRepo.save(item);
  }
}