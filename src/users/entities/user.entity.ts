import { IsEmail } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', length: 200 })
    @IsEmail()
    email: string;

    @Column({ type: 'nvarchar', length: 200 })
    password: string;

    @Column({ type: 'nvarchar', length: 200 })
    name: string;

    @Column({ type: 'nvarchar', length: 50 })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    readonly created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    readonly updated_at: Date;
}

