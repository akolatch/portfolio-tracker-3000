import { Sequelize } from 'sequelize';
import { database } from '../../config/database';

export const ORM = new Sequelize(
  database.name,
  database.user,
  database.password,
  {
    dialect: 'mysql',
  }
);
