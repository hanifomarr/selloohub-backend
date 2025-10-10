import { Merchant } from './merchant.entity';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: true })
  name?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Length(6, 20)
  password!: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role!: 'user' | 'admin';

  @OneToMany(() => Merchant, (merchant) => merchant.user)
  merchants!: Merchant[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
