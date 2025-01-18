import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";

@Entity('orderDetails')
export class OrdersDetail {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column("int")
    readonly quantity?: number;

    @Column()
    readonly size?: string;

    @Column()
    readonly color?: string;

    @Column("decimal", { precision: 10, scale: 2 })
    readonly unit_price?: number;

    @Column("decimal", { precision: 10, scale: 2 })
    readonly total_price?: number;

    @Column("uuid")
    readonly order_id?: string;

    @Column("uuid")
    readonly product_id?: string;

    @ManyToOne(() => Order, order => order.orderDetails)
    readonly order: Order;

    @ManyToOne(() => Product, product => product.orderDetails)
    readonly product: Product;
}
