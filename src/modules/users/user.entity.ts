import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../users/enums/role.enum';

@Entity('users')
export class User extends BaseEntity {

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role!: Role;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status!: string;
}