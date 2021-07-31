import React from 'react';
import { PortfolioData } from '../../types';
import { TickerListItem } from './TickerListItem';

interface Props {
  tickerList: PortfolioData[];
  deleteStock: (tickerId: number) => Promise<void>;
}
export function TickerList({ tickerList, deleteStock }: Props) {
  return (
    <div>
      <ul>
        {tickerList.map((ticker) => (
          <TickerListItem
            key={ticker.id}
            ticker={ticker}
            deleteStock={deleteStock}
          />
        ))}
      </ul>
    </div>
  );
}
