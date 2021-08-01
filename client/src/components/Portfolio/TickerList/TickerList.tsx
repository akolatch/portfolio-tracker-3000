import React from 'react';
import { PortfolioData } from '../../../types';
import { TickerListItem } from './TickerListItem';
import './TickerList.scss';
import { TickerListHeader } from './TickerListHeader';
interface Props {
  tickerList: PortfolioData;
  deleteStock: (tickerId: number) => Promise<void>;
  setPortfolioData: () => Promise<void>;
}
export function TickerList({
  tickerList,
  deleteStock,
  setPortfolioData,
}: Props): React.ReactElement {
  return (
    <div>
      <table>
        <tbody>
          <TickerListHeader />
          {tickerList.map((ticker) => (
            <TickerListItem
              key={ticker.id}
              ticker={ticker}
              deleteStock={deleteStock}
              setPortfolioData={setPortfolioData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
