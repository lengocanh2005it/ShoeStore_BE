import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { PaymentStatus } from '../enums/paymentStatus.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  readonly status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  readonly method: PaymentMethod;

  @Column({
    type: 'timestamp',
  })
  readonly payment_date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  readonly amount: number;

  @OneToOne(() => Order, (order) => order.payment, {
    cascade: true,
  })
  readonly order: Order;

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
