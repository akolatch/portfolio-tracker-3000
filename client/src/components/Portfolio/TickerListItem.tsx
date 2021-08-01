import React from 'react';
import { Link } from 'react-router-dom';
import { TickerData } from '../../types';

interface Props {
  ticker: TickerData;
  deleteStock: (tickerId: number) => Promise<void>;
}

export function TickerListItem({
  ticker,
  deleteStock,
}: Props): React.ReactElement {
  return (
    <li>
      <input type='text' />
      <span>{ticker.symbol}</span>
      <span>{ticker.purchaseDate}</span>
      <span>{ticker.numShares}</span>
      <span>{`$${ticker.pricePaid}`}</span>
      <span>{`$${ticker.currentPrice}`}</span>
      <span>{`$${parseFloat(ticker.currentPrice) * ticker.numShares}`}</span>
      <button>Edit</button>
      <button onClick={() => deleteStock(ticker.id)}>Delete</button>
    </li>
  );
}
