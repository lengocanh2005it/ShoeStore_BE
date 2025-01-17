import { UserRole } from 'src/users/enums/users.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly email: string;

  @Column({ nullable: true })
  readonly password?: string;

  @Column()
  readonly name: string;

  @Column({ nullable: true })
  readonly phone_number?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  readonly role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    readonly created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    readonly updated_at: Date;
}
