import { Expose, Type } from 'class-transformer';
import { ResponseUserDto } from '../auth/response-user.dto';

export class ResponseMerchantDto {
  @Expose() id!: number;
  @Expose() description?: string | null;
  @Expose() address?: string | null;
  @Expose() phone?: string | null;
  @Expose() logo?: string | null;
  @Expose() status!: string;
  @Expose() createdAt!: Date;
  @Expose() updatedAt!: Date;

  @Type(() => ResponseUserDto)
  @Expose()
  user?: ResponseUserDto;
}
