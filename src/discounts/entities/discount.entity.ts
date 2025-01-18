import { Order } from 'src/orders/entities/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { discountStatus } from '../enums/discounts.enum';

@Entity('discounts')
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly code: string;

  @Column({ type: 'int' })
  readonly value: number;

  @Column({ type: 'timestamp' })
  readonly start_date: Date;

  @Column({ type: 'timestamp' })
  readonly end_date: Date;

  @Column({
    type: 'enum',
    enum: discountStatus,
    default: discountStatus.ACTIVE,
  })
  readonly status: discountStatus;

  @OneToMany(() => Order, (order) => order.discount)
  readonly orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
