import { Entity, JoinColumn, OneToMany } from "typeorm";
import { Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Discount } from "../../discounts/entities/discount.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { OrderStatus } from "../enums/orderStatus.enum";
import { OrdersDetail } from "src/orders_details/entities/orders_detail.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    readonly id?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    readonly total_price?: number;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    readonly status?: OrderStatus;

    @Column()
    readonly shipping_address?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    readonly shipping_fee?: number;

    @Column({
        type: 'timestamp'
    })
    readonly created_at?: Date;

    @Column({ name: 'user_id' })
    readonly user_id: string;

    @Column({ name: 'discount_id' })
    readonly discount_id: string;

    @Column({ name: 'payment_id' })
    readonly payment_id: string;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    readonly user: User;

    @ManyToOne(() => Discount, discount => discount.orders)
    @JoinColumn({ name: 'discount_id' })
    readonly discount: Discount;

    @ManyToOne(() => Payment, payment => payment.orders)
    @JoinColumn({ name: 'payment_id' })
    readonly payment: Payment;

    @OneToMany(() => OrdersDetail, orderDetail => orderDetail.order)
    readonly orderDetails: OrdersDetail[];
}
