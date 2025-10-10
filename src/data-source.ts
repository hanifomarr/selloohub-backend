import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config/index';
import { User } from './entity/user.entity';
import { Merchant } from './entity/merchant.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Merchant],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
});
