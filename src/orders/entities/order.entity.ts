import { OrdersDetail } from 'src/orders_details/entities/orders_details.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Discount } from '../../discounts/entities/discount.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../enums/orderStatus.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  readonly total_price: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  readonly status: OrderStatus;

  @Column()
  readonly shipping_address: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  readonly shipping_fee: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @ManyToOne(() => Discount, (discount) => discount.orders)
  @JoinColumn({ name: 'discount_id' })
  readonly discount: Discount;

  @OneToOne(() => Payment, (payment) => payment.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id' })
  readonly payment: Payment;

  @OneToMany(() => OrdersDetail, (orderDetail) => orderDetail.order)
  readonly orderDetails: OrdersDetail[];

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
