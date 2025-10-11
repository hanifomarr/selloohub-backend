import { LoginDto } from '@/dto/auth/login-user.dto';
import { RegisterDto } from '@/dto/auth/register-user.dto';
import { validateDto } from '@/middleware/validate-dto.middleware';
import { authController } from '@/module/auth/auth.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', validateDto(RegisterDto), authController.register);
router.post('/login', validateDto(LoginDto), authController.login);

export default router;
