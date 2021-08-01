interface Ticker {
  symbol: string;
  numShares: number;
  purchaseDate: string;
}

export interface NewTicker extends Ticker {
  pricePaid: number;
}

export interface TickerData extends Ticker {
  id: number;
  pricePaid: string;
  currentPrice: string;
}

export type PortfolioData = TickerData[];
