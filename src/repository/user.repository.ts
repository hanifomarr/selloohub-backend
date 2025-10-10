import { AppDataSource } from '@/data-source';
import { User } from '@/entity/user.entity';

export const userRepo = AppDataSource.getRepository(User);
