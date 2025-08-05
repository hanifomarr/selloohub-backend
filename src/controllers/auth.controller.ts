import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User, Store } from '@/models';
import { generateToken } from '@/utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, storeName } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: 'Email already used' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const slug = storeName.toLowerCase().replace(/\s+/g, '-');

    await Store.create({
      name: storeName,
      slug,
      userId: user.id,
    });

    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.id, email: user.email });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};
