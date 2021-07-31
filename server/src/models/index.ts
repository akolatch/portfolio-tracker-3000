import { Portfolios } from './Portfolios';
import { Tickers } from './Tickers';

Portfolios.hasMany(Tickers, {
  onDelete: 'cascade',
  hooks: true,
});

Tickers.belongsTo(Portfolios, {
  foreignKey: { allowNull: false },
});

export { Portfolios, Tickers };
