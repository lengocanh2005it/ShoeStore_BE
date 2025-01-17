import { Category } from "src/categories/entities/category.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ type: 'nvarchar', length: 200 })
    readonly name: string

    @Column('text')
    readonly description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    readonly price: number;

    @Column()
    readonly image_url: string;
    @Column({ type: 'nvarchar', length: 200 })
    readonly size: string;

    @Column({ type: 'nvarchar', length: 200 }) 
    readonly color: string;

    @Column('int')
    readonly stock_quantity: number;

    @Column('float')
    readonly ratings_number: number;

    @Column({ type: 'nvarchar', length: 200 })
    readonly code: string;

    @CreateDateColumn({ type: 'timestamp' })
    readonly created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    readonly updated_at: Date;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    readonly category: Category;
}
