import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Req() req: any, @Body() body: any) {
    return this.ordersService.checkout(
      req.user.sub,
      body,
    );
  }

  @Get('my-orders')
  myOrders(@Req() req: any) {
    return this.ordersService.myOrders(
      req.user.sub,
    );
  }

  @Get(':id')
  details(@Req() req: any, @Param('id') id: number) {
    return this.ordersService.orderDetails(
      id,
      req.user.sub,
    );
  }
}