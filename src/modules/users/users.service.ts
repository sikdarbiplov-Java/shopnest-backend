import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }
  
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  getVendors() {
    return this.repo.find({
      where: { role: Role.VENDOR },
    });
  }

  getCustomers() {
    return this.repo.find({
      where: { role: Role.CUSTOMER },
    });
  }
}