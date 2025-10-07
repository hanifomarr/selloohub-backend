import config from '@/config';
import jwt from 'jsonwebtoken';

export const generateToken = async (payload: object) => {

    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
}

export const verifyToken = async (token: string) => {
    return jwt.verify(token, config.JWT_SECRET);
}