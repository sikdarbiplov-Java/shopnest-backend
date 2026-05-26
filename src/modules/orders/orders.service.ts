import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';

import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
  ) {}

  async checkout(userId: number, body: any) {
    const cart = await this.cartRepo.findOne({
      where: {
        user_id: userId,
        status: 'ACTIVE',
      },
    });

    if (!cart) {
      throw new BadRequestException('Cart not found');
    }

    const cartItems = await this.cartItemRepo.find({
      where: {
        cart_id: cart.id,
        status: 'ACTIVE',
      },
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    let total = 0;

    for (const item of cartItems) {
      total += Number(item.price) * item.quantity;
    }

    const order = this.orderRepo.create({
      user_id: userId,
      order_number: 'ORD' + Date.now(),
      total_amount: total,
      shipping_address: body.shipping_address,
      status: 'PENDING',
      payment_status: 'PENDING',
    });

    const savedOrder = await this.orderRepo.save(order);

    for (const item of cartItems) {
      await this.orderItemRepo.save({
        order_id: savedOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });

      item.status = 'ORDERED';
      await this.cartItemRepo.save(item);
    }

    return {
      message: 'Order created successfully',
      order: savedOrder,
    };
  }

  async myOrders(userId: number) {
    return this.orderRepo.find({
      where: { user_id: userId },
      order: { id: 'DESC' },
    });
  }

  async orderDetails(id: number, userId: number) {
    return this.orderRepo.findOne({
      where: {
        id,
        user_id: userId,
      },
    });
  }
}