/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WHITELIST: process.env.WHITELIST,
};

export default config;
