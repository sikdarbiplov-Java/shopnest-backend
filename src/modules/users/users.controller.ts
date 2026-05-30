import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('/getUsers')
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('vendors')
  getVendors() {
    return this.usersService.getVendors();
  }

  @Get('customers')
  getCustomers() {
    return this.usersService.getCustomers();
  }
}