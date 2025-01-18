import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order_details' })
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column()
  size: number;

  @Column()
  color: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  unit_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  readonly order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalPrice() {
    if (this.quantity && this.unit_price) {
      this.total_price = this.quantity * this.unit_price;
    }
  }
}
