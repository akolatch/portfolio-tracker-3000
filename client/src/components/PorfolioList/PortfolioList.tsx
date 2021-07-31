import React from 'react';
import { Portfolio } from '../../types';
import { PortfolioListItem } from './PortfolioListItem';

interface Props {
  portfolioList: Portfolio[];
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<Portfolio | null>>;
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
