import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Role } from './enums/role.enum';
import { Status } from './enums/status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  // ✅ Get all ACTIVE users (recommended)
  findAll() {
    return this.repo.find({
      where: { status: Status.ACTIVE },
    });
  }

  // ✅ Find by email
  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email, status: Status.ACTIVE },
    });
  }

  // ✅ Create user
  create(data: Partial<User>) {
    const user = this.repo.create({
      ...data,
      status: Status.ACTIVE, // default status
    });
    return this.repo.save(user);
  }

  // ✅ Find by ID
  findById(id: number) {
    return this.repo.findOne({
      where: { id, status: Status.ACTIVE },
    });
  }

  // ✅ Get vendors
  getVendors() {
    return this.repo.find({
      where: {
        role: Role.VENDOR,
        status: Status.ACTIVE,
      },
    });
  }

  // ✅ Get customers
  getCustomers() {
    return this.repo.find({
      where: {
        role: Role.CUSTOMER,
        status: Status.ACTIVE,
      },
    });
  }

  // ✅ Deactivate user (RECOMMENDED instead of delete)
  async deactivateUser(id: number) {
    const result = await this.repo.update(id, {
      status: Status.INACTIVE,
    });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User deactivated successfully',
    };
  }

  // ✅ Activate user (optional but useful)
  async activateUser(id: number) {
    const result = await this.repo.update(id, {
      status: Status.ACTIVE,
    });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User activated successfully',
    };
  }
}