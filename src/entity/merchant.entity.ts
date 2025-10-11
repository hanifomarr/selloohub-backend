import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  })
  status!: 'active' | 'inactive' | 'suspended';

  @ManyToOne(() => User, (user) => user.merchants, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
