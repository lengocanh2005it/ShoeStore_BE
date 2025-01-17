import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { discountStatus } from "../enums/discounts.enum";
import { Order } from "src/orders/entities/order.entity";


@Entity('discounts')
export class Discount extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id?: string

    @Column({ length: 200 })
    readonly code?: string

    @Column('int')
    readonly value?: number

    @CreateDateColumn({ type: 'timestamp' })
    readonly start_date?: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
    readonly end_date?: Date;

    @Column({
        type: 'enum',
        enum: discountStatus,
        default: discountStatus.ACTIVE,
    })
    readonly status?: discountStatus

    @OneToMany(() => Order, order => order.discount)
    readonly orders: Order[];
}
