import React from 'react';
import { PortfolioData } from '../../types';
import { TickerListItem } from './TickerListItem';

interface Props {
  tickerList: PortfolioData[];
}
export function TickerList({ tickerList }: Props) {
  return (
    <div>
      <ul>
        {tickerList.map((ticker) => (
          <TickerListItem key={ticker.ticker} ticker={ticker} />
        ))}
      </ul>
    </div>
  );
}
