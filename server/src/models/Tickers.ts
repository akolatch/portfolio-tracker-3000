import sequelize, { ModelDefined } from 'sequelize';
import { ORM } from './ORM';

export const Tickers = ORM.define('tickers', {
  symbol: { type: sequelize.STRING, allowNull: false },
  numShares: { type: sequelize.INTEGER, allowNull: false },
  pricePaid: { type: sequelize.DECIMAL(10, 2), allowNull: false },
  purchaseDate: { type: sequelize.STRING, allowNull: false },
});
