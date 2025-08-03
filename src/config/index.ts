/**
 * Node modules
 */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WHITELIST: process.env.WHITELIST,
  MONGO_URI: process.env.MONGO_URI as string,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
};

export default config;
