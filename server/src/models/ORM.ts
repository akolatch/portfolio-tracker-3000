import { Sequelize } from 'sequelize';
import config from 'config';

export const ORM = new Sequelize(
  config.get('database.name'),
  config.get('database.user'),
  config.get('database.password'),
  {
    dialect: 'mysql',
  }
);
