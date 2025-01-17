import { Category } from "src/categories/entities/category.entity";
import { OrdersDetail } from "src/orders_details/entities/orders_detail.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id?: string

    @Column({ length: 200 })
    readonly name?: string

    @Column('text')
    readonly description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    readonly price?: number;

    @Column({ type: 'simple-array' })
    readonly size?: number[];

    @Column()
    readonly image_url?: string;

    @Column({ length: 200 }) 
    readonly color?: string;

    @Column('int')
    readonly stock_quantity?: number;

    @Column('float')
    readonly ratings_number?: number;

    @Column({ length: 200 })
    readonly code?: string; 

    @CreateDateColumn({ type: 'timestamp' })
    readonly created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    readonly updated_at?: Date;

    @Column({ name: 'category_id' })
    category_id: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    readonly category?: Category;

    @OneToMany(() => OrdersDetail, (orderDetail) => orderDetail.product)
    readonly orderDetails?: OrdersDetail[];
}
