import React from 'react';
import { PortfolioDetails } from '../../../types';
import { PortfolioListItem } from './PortfolioListItem';

interface Props {
  portfolioList: PortfolioDetails[];
  setSelectedPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioDetails | null>
  >;
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