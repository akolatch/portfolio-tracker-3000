import { Sequelize } from 'sequelize';
import { database } from '../../config/database';

export const ORM = new Sequelize(
  database.host,
  database.user,
  database.password,
  {
    dialect: 'mysql',
  }
);
