import React from 'react';
import { Link } from 'react-router-dom';
import { PortfolioData } from '../../types';

interface Props {
  ticker: PortfolioData;
  deleteStock: (tickerId: number) => Promise<void>;
}

export function TickerListItem({
  ticker,
  deleteStock,
}: Props): React.ReactElement {
  return (
    <li>
      <input type='text' />
      <span>{ticker.ticker}</span>
      <span>{ticker.createdAt}</span>
      <span>{ticker.shares}</span>
      <span>{`$${ticker.price}`}</span>
      <span>{`$${ticker.currentPrice}`}</span>
      <span>{`$${parseFloat(ticker.currentPrice) * ticker.shares}`}</span>
      <button>Edit</button>
      <button onClick={() => deleteStock(ticker.id)}>Delete</button>
    </li>
  );
}
