import { Sequelize } from 'sequelize';
import config from '.';

const sequelize = new Sequelize(
  config.DB_NAME!,
  config.DB_USER!,
  config.DB_PASSWORD!,
  {
    host: config.DB_HOST,
    dialect: 'mysql',
    port: Number(config.DB_PORT),
    logging: false,
  },
);

export default sequelize;
