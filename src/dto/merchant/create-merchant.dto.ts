import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMerchantDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'suspended'])
  status!: 'active' | 'inactive' | 'suspended';
}
