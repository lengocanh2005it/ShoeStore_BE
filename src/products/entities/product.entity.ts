import { Category } from 'src/categories/entities/category.entity';
import { OrdersDetail } from 'src/orders_details/entities/orders_details.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  readonly price: number;

  @Column({ type: 'json' })
  readonly sizes: number[];

  @Column()
  readonly image_url: string;

  @Column({ type: 'json' })
  readonly colors?: string[];

  @Column({
    type: 'int',
  })
  readonly stock_quantity: number;

  @Column({
    type: 'float',
  })
  readonly ratings_number: number;

  @Column()
  readonly code: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  readonly category: Category;

  @OneToMany(() => OrdersDetail, (orderDetail) => orderDetail.product, {
    cascade: true,
  })
  readonly orderDetails: OrdersDetail[];

  @CreateDateColumn({ type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
