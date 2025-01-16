import { Category } from "src/categories/entities/category.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'nvarchar', length: 200 })
    name: string

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    image_url: string;
    @Column({ type: 'nvarchar', length: 200 })
    size: string;

    @Column({ type: 'nvarchar', length: 200 }) 
    color: string;

    @Column('int')
    stock_quantity: number;

    @Column('float')
    ratings_number: number;

    @Column({ type: 'nvarchar', length: 200 })
    code: string;

    @Column('datetime')
    created_at: Date;

    @Column('datetime')
    updated_at: Date;

    @Column('uuid')
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}
