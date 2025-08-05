import {
  getMe,
  getMyStore,
  updateMyStore,
} from '@/controllers/user.controller';
import { authenticate } from '@/middleware/auth.middleware';
import { Router } from 'express';

const router = Router();

router.get('/me', authenticate, getMe);
router.get('/store', authenticate, getMyStore);
router.put('/store', authenticate, updateMyStore);

export default router;
