import React from 'react';
import { PortfolioData } from '../../types';
import { TickerListItem } from './TickerListItem';
import './TickerList.scss';
import { TickerListHeader } from './TickerListHeader';
interface Props {
  tickerList: PortfolioData;
  deleteStock: (tickerId: number) => Promise<void>;
}
export function TickerList({ tickerList, deleteStock }: Props) {
  return (
    <div>
      <table>
        <TickerListHeader />
        {tickerList.map((ticker) => (
          <TickerListItem
            key={ticker.id}
            ticker={ticker}
            deleteStock={deleteStock}
          />
        ))}
      </table>
    </div>
  );
}
