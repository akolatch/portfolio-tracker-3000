import React from 'react';
import { Link } from 'react-router-dom';
import { PortfolioData } from '../../types';

interface Props {
  ticker: PortfolioData;
}

export function TickerListItem({ ticker }: Props): React.ReactElement {
  return (
    <li>
      <span>{ticker.ticker}</span>
      <span>{ticker.createdAt}</span>
      <span>{ticker.shares}</span>
      <span>{`$${ticker.price}`}</span>
      <span>{`$${ticker.currentPrice}`}</span>
      <span>{`$${parseFloat(ticker.currentPrice) * ticker.shares}`}</span>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
}
