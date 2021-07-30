import { Portfolios } from './Portfolios';
import { Tickers } from './Tickers';

Portfolios.hasMany(Tickers);
Tickers.belongsTo(Portfolios);

export { Portfolios, Tickers };
