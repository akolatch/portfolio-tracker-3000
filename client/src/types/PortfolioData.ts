interface Ticker {
  symbol: string;
  numShares: number;
  purchaseDate: string;
}

export interface NewTicker extends Ticker {
  pricePaid: number;
}

// export type TickerData = {
//   id: number;
//   symbol: string;
//   currentPrice: string;
//   numShares: number;
//   pricePaid: string;
//   purchaseDate: string;
// };
export interface TickerData extends Ticker {
  id: number;
  pricePaid: string;
  currentPrice: string;
}

export type PortfolioData = TickerData[];
