import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 200 })
    name: string

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    image_url: string;
    @Column({ length: 200 })
    size: string;

    @Column({ length: 200 }) 
    color: string;

    @Column('int')
    stock_quantity: number;

    @Column('float')
    ratings_number: number;

    @Column({ length: 200 })
    code: string;

    @Column('datetime')
    created_at: Date;

    @Column('datetime')
    updated_at: Date;

    @Column()
    category_id: number;

    // @ManyToOne(() => Category)
    // @JoinColumn({ name: 'category_id' })
    // category: Category;
}
