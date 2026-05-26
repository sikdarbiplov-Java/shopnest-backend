import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private cartService: CartService
  ) {}

  @Post('add')
  add(@Req() req: any, @Body() body: any) {
    return this.cartService.addToCart(
      req.user.sub,
      body,
    );
  }

  @Get()
  getCart(@Req() req: any) {
    return this.cartService.getCart(
      req.user.sub,
    );
  }

  @Delete('item/:id')
  remove(@Param('id') id: number) {
    return this.cartService.removeItem(id);
  }

  @Put('item/:id')
  update(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.cartService.updateQty(
      id,
      body.quantity,
    );
  }
}