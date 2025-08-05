import { Response } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import { Store, User } from '@/models';

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err });
  }
};

export const getMyStore = async (req: AuthRequest, res: Response) => {
  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.json(store);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch store', error: err });
  }
};

export const updateMyStore = async (req: AuthRequest, res: Response) => {
  const { name, slug } = req.body;

  try {
    const store = await Store.findOne({ where: { userId: req.user.id } });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    store.name = name || store.name;
    store.slug = slug || store.slug;

    await store.save();

    res.json(store);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update store', error: err });
  }
};
