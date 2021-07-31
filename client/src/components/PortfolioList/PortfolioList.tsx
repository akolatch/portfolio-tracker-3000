import React from 'react';
import { TPortfolio } from '../../types';
import { PortfolioListItem } from './PortfolioListItem';

interface Props {
  portfolioList: TPortfolio[];
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<TPortfolio | null>>;
}

export function PortfolioList({
  portfolioList,
  setSelectedPortfolio,
}: Props): React.ReactElement {
  return (
    <ul>
      {portfolioList.map((portfolio) => (
        <PortfolioListItem
          key={portfolio.id}
          portfolio={portfolio}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      ))}
    </ul>
  );
}
