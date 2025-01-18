import { Product } from 'src/products/entities/product.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column({ length: 200 })
  readonly name?: string;

  @Column('text')
  readonly description?: string;

  @OneToMany(() => Product, (product) => product.category)
  readonly products: Product[];
}
