import { AppDataSource } from '@/data-source';
import { Merchant } from '@/entity/merchant.entity';

export const merchantRepo = AppDataSource.getRepository(Merchant);
