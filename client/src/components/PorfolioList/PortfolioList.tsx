import React from 'react';
import { Link } from 'react-router-dom';
import { Portfolio } from '../../types';
import { PortfolioListItem } from './PortfolioListItem';

interface Props {
  portfolioList: Portfolio[];
}

export function PortfolioList({ portfolioList }: Props): React.ReactElement {
  return (
    <ul>
      {portfolioList.map((portfolio) => (
        <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
      ))}
    </ul>
  );
}
