import sequelize from 'sequelize';
import { ORM } from './ORM';

export const Portfolios = ORM.define('portfolios', {
  name: { type: sequelize.STRING, unique: true, allowNull: false },
});
