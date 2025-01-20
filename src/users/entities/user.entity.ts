import { Order } from 'src/orders/entities/order.entity';
import { UserRole } from 'src/users/enums/users.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly email: string;

  @Column({ nullable: true })
  readonly password?: string;

  @Column()
  readonly name: string;

  @Column({ nullable: true })
  readonly phone_number?: string;

  @Column({
    default:
      'https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-black-and-white-avatar-icon-with-a-black-head-vector-png-image_6958961.png',
  })
  readonly avatar_url?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  readonly role: UserRole;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  readonly orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
