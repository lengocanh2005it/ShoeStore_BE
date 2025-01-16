import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar' })
    name: string;

    @Column({ type: 'nvarchar' })
    description: string;
}
