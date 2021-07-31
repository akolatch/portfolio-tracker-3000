import sequelize, { ModelDefined } from 'sequelize';
import { ORM } from './ORM';

export const Tickers = ORM.define('tickers', {
  ticker: { type: sequelize.STRING, allowNull: false },
  shares: { type: sequelize.INTEGER, allowNull: false },
  price: { type: sequelize.DECIMAL(10, 2), allowNull: false },
});
