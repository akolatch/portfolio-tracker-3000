import { Portfolios } from './Portfolios';
import { Tickers } from './Tickers';

Portfolios.hasMany(Tickers);
Tickers.belongsTo(Portfolios, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
});

export { Portfolios, Tickers };
