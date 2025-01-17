import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { PaymentStatus } from "../enums/paymentStatus.enum";
import { PaymentMethod } from "../enums/paymentMethod.enum";
import { Order } from "src/orders/entities/order.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    readonly id?: string


    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    })
    readonly status?: PaymentStatus;

    @Column({
        type: 'enum',
        enum: PaymentMethod
    })
    readonly method?: PaymentMethod;

    @Column({
        type: 'timestamp'
    })
    readonly payment_date?: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    readonly amount?: number;

    @OneToMany(() => Order, order => order.payment)
    readonly orders: Order[];
}
