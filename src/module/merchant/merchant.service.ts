import { CreateMerchantDto } from '@/dto/merchant/create-merchant.dto';
import { merchantRepo } from '@/repository/merchant.repository';
import { userRepo } from '@/repository/user.repository';

class MerchantService {
  /**
   * Create a new merchant
   */
  async CreateMerchant(data: CreateMerchantDto, userId: number) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not Found');

    const merchant = merchantRepo.create({ ...data, user });
    return await merchantRepo.save(merchant);
  }

  async getAllMerchant() {}

  async getMerchantById() {}

  async updateMerchant() {}

  async deleteMerchant() {}
}

export const merchantService = new MerchantService();
