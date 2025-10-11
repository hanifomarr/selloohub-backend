import { AppDataSource } from '@/data-source';
import { LoginDto } from '@/dto/auth/login-user.dto';
import { RegisterDto } from '@/dto/auth/register-user.dto';
import { ResponseUserDto } from '@/dto/auth/response-user.dto';
import { User } from '@/entity/user.entity';
import { comparePassword, hashPassword } from '@/util/bcrypt.util';
import { generateToken } from '@/util/jwt.util';

const userRepository = AppDataSource.getRepository(User);

class AuthService {
  /**
   * Create new User
   */
  async Register(data: RegisterDto) {
    const existingUser = await userRepository.findOneBy({ email: data.email });
    if (existingUser) throw new Error('Email already registered ');

    const newUser = userRepository.create({
      email: data.email,
      password: await hashPassword(data.password),
    });

    const savedUser = await userRepository.save(newUser);

    const token = await generateToken({
      id: savedUser.id,
      email: savedUser.email,
    });

    return { ...savedUser, token };
  }

  /**
   * Login User
   */
  async Login(data: LoginDto) {
    const user = await userRepository.findOneBy({ email: data.email });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = await generateToken({ id: user.id, email: user.email });
    return { ...user, token };
  }
}

export const authService = new AuthService();
