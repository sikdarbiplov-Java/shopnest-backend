import {
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ✅ Get all active users
  @Get('/getUsers')
  getUsers() {
    return this.usersService.findAll();
  }

  // ✅ Get vendors
  @Get('/vendors')
  getVendors() {
    return this.usersService.getVendors();
  }

  // ✅ Get customers
  @Get('/customers')
  getCustomers() {
    return this.usersService.getCustomers();
  }

  // ✅ Get user by ID
  @Get('getUser/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  // ✅ Deactivate user (instead of delete)
  @Patch('deactivate/:id')
  deactivateUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivateUser(id);
  }

  // ✅ Activate user
  @Patch('activate/:id')
  activateUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.activateUser(id);
  }
}